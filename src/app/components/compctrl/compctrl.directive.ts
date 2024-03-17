import { Directive, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ConvertUtilsService } from '../../utils/convert-utils.service';
import { ObjectUtils } from '../../utils/object-utils';
import { CompCtrlContainer } from './compctrl.container';

@Directive({
    selector: '[compCtrl]'
})
export class CompCtrlDirective implements OnInit {

    private _compCtrl: string;
    private _valid: boolean = false;
    private _disabled: boolean = false;
    private _required: boolean = false;

    constructor(public model: NgModel,
        public readonly convertUtilsService: ConvertUtilsService,
        @Optional() @Self() public compCtrlContainer: CompCtrlContainer) {
        if (compCtrlContainer) {
            this.compCtrlContainer = compCtrlContainer;
        } else {
            throw new Error('CompCtrlContainer not initialized ' + JSON.stringify(this.model));
        }
    }

    @Input('compCtrl')
    set compCtrl(value: string) {
        if (!(!!value) && !!this.compCtrlContainer.getLabel()) {
            value = this.compCtrlContainer.getLabel();
        }
        if (!(!!value)) {
            console.error('Identificado do compCtrl não informado', this);
            throw new Error('Identificado do compCtrl não informado');
        }
        this._compCtrl = value;
    }

    get compCtrl() {
        return this._compCtrl;
    }

    public ngOnInit(): void {
        this.setDisabledToCompCtrl();
        this.setRequiredToCompCtrl();
    }

    @Input('disabled')
    set disabled(value: any) {
        this._disabled = this.convertUtilsService.getBoolean(value, false);
        this.setDisabledToCompCtrl();
    }

    private setDisabledToCompCtrl() {
        this.compCtrlContainer.setDisabledState(this._disabled);
        if (this._disabled) {
            this.compCtrlContainer.addClass('disabled');
        } else {
            this.compCtrlContainer.removeClass('disabled');
        }
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

    @Output()
    public validate(setFocus: boolean): boolean {
        const causes: string[] = this.verify(this.compCtrlContainer.getValue());
        this._valid = ObjectUtils.isEmpty(causes);
        if (setFocus && !this._valid) {
            this.setFocus();
        }
        this._valid ? this.setClassValid() : this.setClassInvalid();
        this.compCtrlContainer.setInvalidCause(causes);
        return this._valid;
    }

    private verify(value: any): string[] {
        let causes: string[] = [];
        const preenchido: boolean = (!this._required) ? true : ObjectUtils.isNotEmpty(value);
        if (!preenchido) {
            causes.push('Campo obrigatório não preenchido!')
        }
        const internalValidates: string[] = this.compCtrlContainer.validate();
        if (ObjectUtils.isNotEmpty(internalValidates)) {
            causes = causes.concat(internalValidates);
        }
        return causes.length > 0 ? causes : null;
    }

    private setClassValid() {
        this.compCtrlContainer.removeClass('required-invalid');

        this.compCtrlContainer.removeClass('valid');
        this.compCtrlContainer.addClass('valid');
    }

    private setClassInvalid() {
        this.compCtrlContainer.removeClass('valid');

        this.compCtrlContainer.removeClass('required-invalid');
        this.compCtrlContainer.addClass('required-invalid');
    }

}
