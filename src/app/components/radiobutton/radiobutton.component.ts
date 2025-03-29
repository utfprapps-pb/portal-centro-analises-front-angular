import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { CompCtrlContainer } from '../../core/directives/compctrl/compctrl.container';
import { getEnum, getEnumTranslation } from '../../core/enums/enum-mapper';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { ObjectUtils } from '../../utils/object-utils';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'radio-button',
    templateUrl: './radiobutton.component.html',
    styleUrl: './radiobutton.component.scss',
    providers: [
        InputBaseComponent.CONTROL(RadioButtonComponent),
        CompCtrlContainer.PROVIDER(RadioButtonComponent)
    ],
})
export class RadioButtonComponent extends CompCtrlContainer implements ControlValueAccessor {

    @ViewChild('input') component: ElementRef<HTMLDivElement>;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() placeholder: string = '';
    @Input() class: string = 'field-checkbox d-flex';
    @Input() vertical: boolean = true;
    @Input() ignore: string = null;
    @Input() disables: string = null;

    @Input('showClear') showClear: boolean = true;

    @Output('onChange') onChangeEventEmitter: EventEmitter<number> = new EventEmitter();

    private _innerObject: any;
    private _innerValue: string = null;
    private _disabled: boolean = null;
    private _required: boolean = false;
    public invalidCause: string[] = null;

    @Input('enum') set enum(name: string) {
        const enu = getEnum(name);
        for (const key in enu) {
            this._options.push({ guid: Guid.raw(), key: key, value: getEnumTranslation(name, key) })
        }
    };
    public _options: any[] = []
    get options(): any[] {
        if (ObjectUtils.isEmpty(this.ignore)) {
            return this._options;
        }
        return this._options.filter(it => !this.ignore.split(',').includes(it.key))
    }

    public isOptionDisabled(option: any): boolean {
        return this.disabled || (ObjectUtils.isNotEmpty(this.disables) && this.disables.split(',').includes(option.key));
    }

    constructor(protected readonly convertUtilsService: ConvertUtilsService) {
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

    @Input() set disabled(value: any) {
        this._disabled = this.convertUtilsService.getBoolean(value, false);
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

    get innerObject(): any {
        return this._innerObject;
    }

    set innerObject(value: any) {
        if (value !== this.innerObject) {
            this._innerObject = value;
            this.innerValue = value?.key;
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
            this.onChangeEventEmitter.emit(value);
        }
    }

    // Escreve o valor do modelo para o componente
    writeValue(value: any): void {
        if (value !== this.innerObject) {
            if (typeof (value) == 'string') {
                let val = this._options.find(it => it.key == value);
                if (val == undefined) {
                    val = this._options.find(it => it.value == value);
                }
                this.innerObject = val;
            } else {
                this.innerObject = value;
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
        this.innerValue = null;
    }

    override getContainer(): any {
        return this.component.nativeElement.firstChild;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            this.component.nativeElement.querySelector('input').focus();
        });
    }
}
