import { ChangeDetectorRef, Directive, forwardRef, inject, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Guid } from '../../../utils/models/guid';


@Directive()
export abstract class CompCtrlContainer<T = any> implements Validator {

    protected cdr = inject(ChangeDetectorRef);

    public static PROVIDER(component: any): any {
        return {
            provide: CompCtrlContainer,
            useExisting: forwardRef(() => component)
        }
    }

    @Input() id: string = Guid.raw();
    internalDisabled: boolean = null;
    @Input() ignoreInternalDisabled: boolean = false;

    validate(control: AbstractControl): ValidationErrors | null {
        const errors = this.getValidationMessage ? this.getValidationMessage() : [];
        
        this.setInvalidCause(errors);

        return errors && errors.length > 0 ? { customError: errors } : null;
    }

    abstract getContainer(): any;
    abstract getLabel(): string;
    abstract setRequiredState(value: boolean): void;
    abstract setDisabledState(value: boolean): void;
    abstract setFocus(): void;
    abstract addClass(value: string): void;
    abstract removeClass(value: string): void;
    abstract getValue(): T;
    abstract getValidationMessage(): string[];
    abstract setInvalidCause(value: string[]): void;

    protected markForCheck() {
        this.cdr.markForCheck();
    }

    protected detectChanges() {
        this.cdr.detectChanges();
    }
}
