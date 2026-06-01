import { Directive, Input, OnDestroy, OnInit, Optional, Self, inject } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ConvertUtilsService } from '../../../utils/convert-utils.service';
import { ObjectUtils } from '../../../utils/object-utils';
import { CompCtrlContainer } from './compctrl.container';
import { CompCtrlDirectiveService } from './compctrl.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
    selector: '[compCtrl]'
})
export class CompCtrlDirective implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    private _compCtrl: string;
    private _valid: boolean = false;
    private _disabled: boolean = null;
    private _required: boolean = false;

    private convertUtilsService = inject(ConvertUtilsService);
    private registry = inject(CompCtrlDirectiveService);
    
    public compCtrlContainer = inject(CompCtrlContainer, { optional: true, self: true })!;

    constructor(@Optional() @Self() private model: NgModel) {
        if (!this.compCtrlContainer) {
            throw new Error(`CompCtrlContainer not initialized. Ensure this directive is placed on a valid component container.`);
        }
    }

    get valid() {
        return this._valid;
    }
    set valid(value: boolean) {
        this._valid = value;
    }

    @Input('compCtrl')
    set compCtrl(value: string) {
        if (!value && !!this.compCtrlContainer.getLabel()) {
            value = this.compCtrlContainer.getLabel();
        }
        if (!value) {
            console.error('Identificador do compCtrl não informado', this);
            throw new Error('Identificador do compCtrl não informado');
        }
        this._compCtrl = value;
    }

    get compCtrl() {
        return this._compCtrl;
    }

    public ngOnInit(): void {
        this.setDisabledToCompCtrl();
        this.setRequiredToCompCtrl();
        this.registry.register(this);

        if (this.model) {
            this.model.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.validate(false, false);
            });
        }
    }

    public ngOnDestroy(): void {
        this.registry.unregister(this);
        this.destroy$.next();
        this.destroy$.complete();
    }

    @Input('disabled')
    set disabled(value: any) {
        this._disabled = this.convertUtilsService.getBoolean(value, false);
        this.setDisabledToCompCtrl();
    }

    private setDisabledToCompCtrl() {
        if (this._disabled !== null) {
            this.compCtrlContainer.setDisabledState(this._disabled);
            if (this._disabled) {
                this.compCtrlContainer.addClass('disabled');
            } else {
                this.compCtrlContainer.removeClass('disabled');
            }
        }
    }

    public setInternalDisabled(value: boolean): void {
        if (this.compCtrlContainer.ignoreInternalDisabled) {
            return;
        }
        this.compCtrlContainer.internalDisabled = value;
        this.compCtrlContainer.setDisabledState(this.compCtrlContainer.internalDisabled);
        this.setDisabledToCompCtrl();
    }

    @Input('required')
    set required(value: any) {
        this._required = this.convertUtilsService.getBoolean(value);
        this.setRequiredToCompCtrl();
    }

    private setRequiredToCompCtrl() {
        this.compCtrlContainer.setRequiredState(this._required);
        if (this._required) {
            this.compCtrlContainer.addClass('required');
        } else {
            this.compCtrlContainer.removeClass('required');
        }
    }

    public setFocus(): void {
        setTimeout(() => {
            this.compCtrlContainer.setFocus();
        });
    }

    public validate(setFocus: boolean, alert: boolean = true): boolean {
        const causes: string[] = this.verify(this.compCtrlContainer.getValue());
        this._valid = ObjectUtils.isEmpty(causes);

        if (alert && setFocus && !this._valid) {
            this.setFocus();
        }

        this.compCtrlContainer.setInvalidCause(causes);
        this._valid ? this.setClassValid() : this.setClassInvalid();

        return this._valid;
    }

    public invalidate(cause: string): void {
        this._valid = false;
        this.setFocus();
        this.setClassInvalid()
        this.compCtrlContainer.setInvalidCause([cause]);
    }

    private verify(value: any): string[] {
        let causes: string[] = [];
        const preenchido: boolean = !this._required || ObjectUtils.isNotEmpty(value);
        
        if (!preenchido) {
            causes.push('Campo obrigatório não preenchido!')
        }

        const internalValidates: string[] = this.compCtrlContainer.getValidationMessage();
        if (ObjectUtils.isNotEmpty(internalValidates)) {
            causes = causes.concat(internalValidates);
        }

        return causes.length > 0 ? causes : [];
    }

    public setClassValid() {
        this.compCtrlContainer.addClass('valid');
    }

    public setClassInvalid() {
        this.compCtrlContainer.removeClass('valid');
    }

}
