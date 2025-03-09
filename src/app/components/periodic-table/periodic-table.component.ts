import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

import { Debounce } from '../../core/decorators/decorators';
import { CompCtrlContainer } from '../../core/directives/compctrl/compctrl.container';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { ObjectUtils } from '../../utils/object-utils';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';
import { ElementoQuimico } from './periodic-table-element/elemento-quimico.interface';

@Component({
    selector: 'periodic-table',
    templateUrl: './periodic-table.component.html',
    styleUrl: './periodic-table.component.scss',
    providers: [
        InputBaseComponent.CONTROL(PeriodicTableComponent),
        CompCtrlContainer.PROVIDER(PeriodicTableComponent)
    ],
})
export class PeriodicTableComponent extends CompCtrlContainer implements ControlValueAccessor, OnInit {

    @ViewChild('input') component: ElementRef<HTMLTableElement>;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() id: string = Guid.raw();
    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() class: string = '';

    private elementos: ElementoQuimico[] = [];
    private _innerObject: ElementoQuimico[] = null;
    private _innerValue: string = null;
    private _disabled: boolean = null;
    private _required: boolean = false;
    public invalidCause: string[] = null;

    public tabelaPeriodica: ElementoQuimico[][] = [];
    public elementoEmFoco: ElementoQuimico = null;

    constructor(
        protected readonly convertUtilsService: ConvertUtilsService,
        private readonly http: HttpClient,
    ) {
        super();
    }

    // Função chamada quando o valor interno muda
    private onChange: (value: any) => void = () => { };

    // Função chamada quando o componente é tocado (tocado no DOM)
    private onTouched: () => void = () => { };

    // Registra a função a ser chamada quando o valor interno muda
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    // Registra a função a ser chamada quando o componente é tocado
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    private internalDisabled: boolean = null;
    @Input() set disabled(value: any) {
        let savePermanentDisabledState;
        if (this.disabled == null) {
            savePermanentDisabledState = true;
        }
        this._disabled = this.convertUtilsService.getBoolean(value, false);
        if (savePermanentDisabledState) {
            this.internalDisabled = this._disabled;
        }
    }
    get disabled() {
        if (this.internalDisabled != null) {
            return this.internalDisabled
        }
        return this._disabled;
    }

    @Input() set required(value: any) {
        this._required = this.convertUtilsService.getBoolean(value, false);
    }
    get required() {
        return this._required;
    }

    get innerObject(): ElementoQuimico[] {
        return this._innerObject;
    }

    set innerObject(value: ElementoQuimico[]) {
        if (value !== this.innerObject) {
            this._innerObject = value;
            const texto = !!value ? this.innerObject.map(it => it.number).join(',') : null;
            if (ObjectUtils.isEmpty(texto)) {
                this._innerObject = null;
                this.innerValue = null;
                this.elementos.filter(it => it.selected).forEach(element => element.selected = false);
            } else {
                this.innerValue = texto;
            }
        }
    }

    // Obtém o valor do modelo
    get innerValue(): any {
        return this._innerValue;
    }

    // Define o valor do modelo e chama a função de callback
    set innerValue(value: any) {
        if (value !== this.innerValue) {
            this._innerValue = value;
            this.onChange(value);
        }
    }

    @Debounce(100)
    writeValue(value: any): void {
        if (value !== this.innerObject) {
            if (ObjectUtils.isEmpty(this.elementos)) {
                setTimeout(() => {
                    this.writeValue(value);
                    return;
                }, 100);
            }
            if (typeof (value) == 'string') {
                const numbers: string[] = value.split(',');
                const values: ElementoQuimico[] = [];
                const numberosTrabalhados: string[] = [];
                for (const numb of numbers) {
                    if (numberosTrabalhados.includes(numb)) {
                        continue;
                    }
                    const val: ElementoQuimico = this.elementos.find(it => it.number.toString() == numb.toString());
                    if (val != undefined) {
                        values.push(val);
                        val.selected = true;
                    }
                }
                if (values.length > 0) {
                    this.innerObject = values;
                } else {
                    this.innerObject = null;
                }
            }
        }
    }

    public addClass(value: string) {
        const classes: string[] = this.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == value) {
                return;
            }
        }
        classes.push(value);
        this.class = classes.join(' ');
    }

    public removeClass(value: string) {
        const classes: string[] = this.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == value) {
                classes.splice(i, 1);
                break;
            }
        }
        this.class = classes.join(' ');
    }

    override setDisabledState(value: boolean): void {
        this.disabled = value;
    }

    override setRequiredState(value: boolean): void {
        this.required = value;
    }

    override getValue(): any {
        return this.innerValue;
    }

    override getLabel(): string {
        return this.label;
    }

    override validate(): string[] {
        const causes: string[] = [];
        return causes;
    }

    override setInvalidCause(value: string[]): void {
        this.invalidCause = value;
    }

    public forceClear(): void {
        this.innerObject = null;
    }

    override getContainer(): any {
        return this.component.nativeElement;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            (this.component.nativeElement as any).focus();
        });
    }

    public ngOnInit(): void {
        this.carregarArquivoTabela().subscribe((dados) => {
            this.elementos = dados;
            this.organizarTabela(dados);
        });
    }

    private carregarArquivoTabela(): Observable<any[]> {
        return this.http.get<any[]>('assets/data/periodic-table-translated.json');
    }

    private organizarTabela(dados: ElementoQuimico[]): void {
        const linhas = 7; // Número de linhas da tabela periódica
        const colunas = 18; // Número máximo de colunas
        this.tabelaPeriodica = Array.from({ length: linhas }, () => Array(colunas).fill(null));

        dados.forEach((elemento) => {
            const x = elemento.ypos - 1; // Posição na linha
            const y = elemento.xpos - 1; // Posição na coluna

            if (ObjectUtils.isEmpty(this.tabelaPeriodica[x])) {
                this.tabelaPeriodica[x] = [];
            }
            this.tabelaPeriodica[x][y] = elemento;
        });
    }

    public onSelectElement(element: ElementoQuimico): void {
        if (ObjectUtils.isEmpty(this.innerObject)) {
            this._innerObject = [];
        }
        const copy: ElementoQuimico[] = this.convertUtilsService.cloneObject(this.innerObject);

        element.selected = !element.selected;
        if (element.selected) {
            copy.push(element);
            this.innerObject = copy;
        } else {
            const index: number = copy.findIndex(it => it.number = element.number);
            if (index != -1) {
                copy.splice(index, 1);
                this.innerObject = copy;
            }
            if (ObjectUtils.isEmpty(this.innerObject)) {
                this.innerObject = null;
            }
        }
    }

    get elementosSelecionados(): string {
        if (this.innerObject == null) {
            return 'Nenhum elemento selecionado.'
        } else {
            return this.innerObject.sort((a, b) => a.number < b.number ? -1 : 1).map(it => it.number + ' - ' + it.name).join(', ');
        }
    }


}
