import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { CompCtrlContainer } from '../compctrl/compctrl.container';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../inputs/invalid-info/invalid-info.component';

@Component({
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    providers: [
        InputBaseComponent.CONTROL(CheckBoxComponent),
        CompCtrlContainer.PROVIDER(CheckBoxComponent)
    ],
})
export class CheckBoxComponent extends CompCtrlContainer implements ControlValueAccessor {

    @ViewChild('input') component: ElementRef<Checkbox>;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() id: string = Guid.raw();
    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() placeholder: string = '';
    @Input() class: string = 'd-contents';
    @Input() vertical: boolean = true;

    @Output('onChange') onChangeEventEmmiter: EventEmitter<number> = new EventEmitter();

    private _innerObject: any;
    private _innerValue: string = null;
    private _disabled: boolean = null;
    private _required: boolean = false;
    public invalidCause: string[] = null;

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
            this.onChangeEventEmmiter.emit(value);
        }
    }

    // Escreve o valor do modelo para o componente
    writeValue(value: any): void {
        if (value !== this.innerObject) {
            if (typeof (value) == 'string') {
                this.innerObject = value == 'true';
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
}
