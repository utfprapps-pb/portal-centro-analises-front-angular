import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { Guid } from './../../../utils/guid';

@Component({
    selector: 'input-base',
    template: ''
})
export class InputBaseComponent implements ControlValueAccessor {

    @Input() label: String = null;
    @Input() name: string = Guid.raw();
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;

    public innerValue: string = null;

    // Implementa métodos da interface ControlValueAccessor
    writeValue(value: any): void {
        this.innerValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // Métodos para notificar alterações no valor
    private onChange: (value: any) => void = () => { };
    private onTouched: () => void = () => { };

    // Método chamado quando o valor é alterado no componente
    onInputChange() {
        this.onChange(this.innerValue);
        this.onTouched();
    }

}
