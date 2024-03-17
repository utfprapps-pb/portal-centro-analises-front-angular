import { Injectable, Injector } from '@angular/core';

import { LoginService } from '../../login/login/login.service';
import { CompCtrlDirective } from '../compctrl/compctrl.directive';
import { FormBaseComponent } from './form-base.component';

@Injectable()
export abstract class FormComponent {

    public abstract formView: FormBaseComponent;

    public loginService: LoginService;

    private disabledElements: any[] = [];

    constructor(
        protected readonly injector: Injector,
    ) {
        this.loginService = injector.get(LoginService);
    }

    public getFieldsCompCtrl(): CompCtrlDirective[] {
        let compControlList: CompCtrlDirective[] = [];
        if (this.formView != null) {
            if (this.formView.contentFieldsCompCtrlForm != null) {
                compControlList = this.formView.contentFieldsCompCtrlForm.toArray();
            }
        }
        return compControlList;
    }

    public getFocusableElementstring(): string {
        return `
        i:not([disabled]):not([not-disabled]),
        a:not([disabled]):not([not-disabled]),
        area:not([disabled]):not([not-disabled]),
        input:not([disabled]):not([not-disabled]),
        select:not([disabled]):not([not-disabled]),
        textarea:not([disabled]):not([not-disabled]),
        button:not([disabled]):not([not-disabled]),
        iframe,
        object,
        embed,
        *[tabindex],
        *[contenteditable]`;
    }

    public disableForm(value: boolean = true) {
        let aux: any[] = this.formView.formBase.first.nativeElement.querySelectorAll(this.getFocusableElementstring());
        aux = Array.prototype.slice.call(aux);
        for (const aux of this.disabledElements) {
            aux.disabled = false;
        }
        for (const c of aux) {
            if (c.className && c.className.split(' ').indexOf('not-disabled') < 0) {
                c.disabled = value;
                if (value) {
                    this.disabledElements.push(c);
                }
            }
        }
        const fieldsCompCtrlList = this.getFieldsCompCtrl();
        for (const field of fieldsCompCtrlList) {
            field.compCtrlContainer.setDisabledState(value);
        }
    }

    public blockForm(): void {
        if (this.formView) {
            this.disableForm(true);
            this.formView.blockForm();
        }
    }

    public releaseForm(force: boolean = false): void {
        if (this.formView) {
            const released = this.formView.releaseForm(force);
            if (released) {
                this.disableForm(false);
            }
        }
    }

    private validForm(): Map<string, boolean> {
        const mapResult = new Map<string, boolean>();

        const fieldsRequired = this.getFieldsCompCtrl().filter(it => it['_required']);

        let firstInvalidField: CompCtrlDirective;;
        for (const field of fieldsRequired) {
            if (!field.validate(false)) {
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
                mapResult.set(field.compCtrl, false);
            }
        }
        if (!!firstInvalidField) {
            firstInvalidField.setFocus();
        }
        return mapResult;
    }

    public validateForm(showAlert: boolean = true): boolean {
        const validForm: Map<string, boolean> = this.validForm();

        const titleAlert = 'Campos obrigatórios não Preenchidos';
        const bodyAlert = new Array<string>();

        bodyAlert.push('<div style="max-height: 700px;">');
        bodyAlert.push('<table style="max-height: 700px;" class="table table-responsive table-striped m-b-0">');
        bodyAlert.push('<thead>');
        bodyAlert.push('<tr>');
        bodyAlert.push('<th style="width: 40px;">#</th>');
        bodyAlert.push(`<th>${titleAlert}</th>`);
        bodyAlert.push('</tr>');
        bodyAlert.push('</thead>');
        bodyAlert.push('<tbody>');

        let indexError = 0;

        for (const [compCtrl, valid] of validForm) {
            if (!valid) {
                indexError++;
            }
            if (showAlert && !valid) {
                bodyAlert.push('<tr>');
                bodyAlert.push('<td style="width: 40px;" class="text-center">' + indexError + '</td>');
                bodyAlert.push('<td class="text-left">' + compCtrl + '</td>');
                bodyAlert.push('</tr>');
            }
        }

        bodyAlert.push('</tbody>');
        bodyAlert.push('</table>');
        bodyAlert.push('</div>');

        if (showAlert && indexError > 0 && bodyAlert.toString().includes('</td>')) {
            // Todo: Exibir mensagem de erro;
            console.log(bodyAlert.join(''))
            // alert(bodyAlert.join(' '));
            // this.toasterService.simplePop(Toaster3Type.WARNING, bodyAlert.join(' '));
        }

        return (indexError === 0);
    }
}
