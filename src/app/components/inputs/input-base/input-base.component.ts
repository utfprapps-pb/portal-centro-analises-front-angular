import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Guid } from '../../../utils/models/guid';
import { ObjectUtils } from '../../../utils/object-utils';
import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { ConvertUtilsService } from './../../../utils/convert-utils.service';

@Directive()
export abstract class InputBaseComponent extends CompCtrlContainer implements ControlValueAccessor {

    public static CONTROL(input: any): any {
        return {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => input),
            multi: true
        };
    }

    @Input() id: string = Guid.raw();
    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() placeholder: string = '';
    @Input() class: string = 'w-100';
    @Input() minlength: number = null;
    @Input() maxlength: number = 255;

    @Input('showClear') showClear: boolean = true;

    @Output('onChange') onChangeEventEmmiter: EventEmitter<number> = new EventEmitter();

    private _innerValue: string = null;
    private _disabled: boolean = null;
    private _required: boolean = false;
    public invalidCause: string[] = null;

    constructor(protected readonly convertUtilsService: ConvertUtilsService) {
        super();
        this.afterConstructor();
    }

    protected afterConstructor(): void {

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
        this._disabled = this.convertUtilsService.getBoolean(value, true);
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
        this._required = this.convertUtilsService.getBoolean(value, true);
    }
    get required() {
        return this._required;
    }

    // Obtém o valor do modelo
    get innerValue(): any {
        return this._innerValue;
    }

    // Define o valor do modelo e chama a função de callback
    set innerValue(v: any) {
        if (v !== this.innerValue) {
            this._innerValue = v;
            this.onChange(v);
            this.onChangeEventEmmiter.emit(v);
        }
    }

    // Escreve o valor do modelo para o componente
    writeValue(value: any): void {
        if (!!this.getContainer()) {
            this.innerValue = value;
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
        if (!this.isValidMinLength()) {
            causes.push(`Minímo de caracteres exigidos: ${this.minlength}`);
        }
        return causes;
    }

    override setInvalidCause(value: string[]): void {
        this.invalidCause = value;
    }

    private isValidMinLength(): boolean {
        if (ObjectUtils.isNotEmpty(this.minlength) && this.minlength >= 0) {
            if (this._innerValue != null) {
                return this._innerValue.toString().length >= this.minlength;
            } else if (this._required) {
                return false;
            }
        }
        return true;
    }

    public forceClear(): void {
        this.innerValue = null;
    }
}
