import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

import { CompCtrlContainer } from '../../../core/directives/compctrl/compctrl.container';
import { Guid } from '../../../utils/models/guid';
import { ObjectUtils } from '../../../utils/object-utils';
import { ConvertUtilsService } from './../../../utils/convert-utils.service';

@Directive()
export abstract class InputBaseComponent<T = any> extends CompCtrlContainer implements ControlValueAccessor, Validator {

    public static CONTROL(input: any): any {
        return [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => input),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => input),
                multi: true
            }
        ];
    }

    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() placeholder: string = '';
    @Input() class: string = 'w-100';
    @Input() minlength: number = null;
    @Input() maxlength: number = 255;

    @Input('showClear') showClear: boolean = true;

    @Output('onChange') onChangeEventEmitter: EventEmitter<T> = new EventEmitter<T>();

    protected _innerValue: T = null;

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
    private onChange: (value: T) => void = () => { };

    // Função chamada quando o componente é tocado (tocado no DOM)
    protected onTouched: () => void = () => { };

    // Função chamada quando o validador é chamado
    private onValidatorChange: () => void = () => { };

    // Registra a função a ser chamada quando o valor interno muda
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    // Registra a função a ser chamada quando o componente é tocado
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    registerOnValidatorChange(fn : () => void): void {
        this.onValidatorChange = fn
    }

    @Input() set disabled(value: any) {
        this._disabled = this.convertUtilsService.getBoolean(value, false);
    }

    get disabled() {
        if (this.internalDisabled != null && !this.ignoreInternalDisabled) {
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
    get innerValue(): T {
        return this._innerValue;
    }

    // Define o valor do modelo e chama a função de callback
    set innerValue(v: T) {
        console.log("Setter called with:", v);

        if (!ObjectUtils.equals(v, this._innerValue)) {
            this._innerValue = v;
            this.onChange(v);
            this.onChangeEventEmitter.emit(v);

            if(this.onValidatorChange) {
                this.onValidatorChange();
            }
            this.markForCheck();
        }
    }

    private runValidationLogic(): string[] {
        const causes: string[] = [];

        if (this._required && ObjectUtils.isEmpty(this._innerValue)) {
            causes.push(`Campo obrigatório`);
            return causes;
        }


        if (ObjectUtils.isNotEmpty(this.minlength) && this.minlength >= 0 && this._innerValue != null) {
            const length = (this._innerValue as any).length;
            if (length !== undefined && length < this.minlength) {
                causes.push(`Mínimo de caracteres exigidos: ${this.minlength}`);
            }
        }

        return causes;
    }

    // Escreve o valor do modelo para o componente
    writeValue(value: T): void {
        if (!ObjectUtils.equals(value, this._innerValue)) {
            this._innerValue = value;
            this.markForCheck();
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

    override getValidationMessage(): string[] {
        return this.runValidationLogic();
    }

    override setInvalidCause(value: string[]): void {
        this.invalidCause = value;
    }

    public forceClear(): void {
        this.innerValue = null;
        this.onTouched();
    }

}
