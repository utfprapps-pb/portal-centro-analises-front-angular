import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { CompCtrlContainer } from '../../core/directives/compctrl/compctrl.container';
import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { Guid } from '../../utils/models/guid';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrl: './checkbox-group.component.scss',
    providers: [
        InputBaseComponent.CONTROL(CheckBoxGroupComponent),
        CompCtrlContainer.PROVIDER(CheckBoxGroupComponent)
    ],
})
export class CheckBoxGroupComponent extends CompCtrlContainer<any[]> implements ControlValueAccessor{

    @ViewChild('groupContainer') groupContainer: ElementRef;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() name: string = Guid.raw();
    @Input() label: string = null;
    @Input() class: string = 'd-contents';
    @Input() vertical: boolean = true;

    @Input() options: any[] = [];
    @Input() labelKey: string = 'label';
    @Input() valueKey: string = 'value';
    @Input() showSymbolInLabel: boolean = false;

    @Output('onChange') onChangeEventEmitter: EventEmitter<any[]> = new EventEmitter();
    
    private _innerObject: any[] = [];
    private _innerValue: any[] = [];
    private _disabled: boolean = false;
    private _required: boolean = false;
    public invalidCause: string[] = null;

    constructor(protected readonly convertUtilsService: ConvertUtilsService) {
        super();
    }

    // Função chamada quando o valor interno muda
    private onChange: (value: any) => void = () => { };

    // Função chamada quando o componente é tocado (tocado no DOM)
    private onTouched: () => void = () => { };

    private onValidatorChange: () => void = () => { };

    // Registra a função a ser chamada quando o valor interno muda
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    // Registra a função a ser chamada quando o componente é tocado
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValidatorChange = fn;
    }

    @Input() set disabled(value: any) {
        this._disabled = this.convertUtilsService.getBoolean(value, false);
    }

    get disabled() {
        if (this.internalDisabled != null) {
            if (this.class.includes('not-disabled')) {
                return false;
            }
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

    get innerObject(): any[] {
        return this._innerObject;
    }

    set innerObject(value: any[]) {
        if (value !== this._innerObject) {
            this._innerObject = value || [];
            this.innerValue = this._innerObject;
        }
    }

    // Obtém o valor do modelo
    get innerValue(): any[] {
        return this._innerValue;
    }

    // Define o valor do modelo e chama a função de callback
    set innerValue(value: any[]) {
        if (value !== this._innerValue) {
            this._innerValue = value || [];
            
            this.onChange(this._innerValue);
            this.onChangeEventEmitter.emit(this._innerValue);
            
            if (this.onValidatorChange) {
                this.onValidatorChange();
            }

            this.markForCheck();
        }
    }

    // Escreve o valor do modelo para o componente
    writeValue(value: any): void {
        if (Array.isArray(value)) {
            this._innerObject = value;
            this._innerValue = value;
        } else {
            this._innerObject = [];
            this._innerValue = [];
        }
        this.markForCheck();
    }

    public addClass(value: string) {
        const classes: string[] = this.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == value) {
                return;
            }
            if (value == 'not-disabled' && this.disabled) {
                this.disabled = false;
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
        if (this.class.includes('not-disabled') && value) {
            value = false;
        }
        this.disabled = value;
    }

    override setRequiredState(value: boolean): void {
        this.required = value;
    }

    override getValue(): any[] {
        return this.innerValue;
    }

    override getLabel(): string {
        return this.label;
    }

    override getValidationMessage(): string[] {
        const causes: string[] = [];
        if (this.required && (!this.innerValue || this.innerValue.length === 0)) {
            causes.push('Selecione pelo menos uma opção.');
        }
        return causes;
    }

    override setInvalidCause(value: string[]): void {
        this.invalidCause = value;
    }

    public forceClear(): void {
        this.innerObject = [];
        this.innerValue = [];
    }

    override getContainer(): any {
        return this.groupContainer;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        const firstInput = this.groupContainer?.nativeElement?.querySelector('input[type="checkbox"]');
        if (firstInput) {
            firstInput.focus();
        }
    }

    public isOptionSelected(option: any): boolean {
        const val = option[this.valueKey];
        return this.innerValue ? this.innerValue.includes(val) : false;
    }

    public onToggleOption(option: any, event: Event): void {
        if (this.disabled) return;

        const checkbox = event.target as HTMLInputElement;
        const val = option[this.valueKey];
        let currentSelections = [...this.innerValue];

        if (checkbox.checked) {
            if (!currentSelections.includes(val)) {
                currentSelections.push(val);
            }
        } else {
            currentSelections = currentSelections.filter(item => item !== val);
        }

        this.onTouched();
        this.innerValue = currentSelections;
    }
}
