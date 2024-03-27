import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { LoginService } from '../../login/login/login.service';
import { ObjectUtils } from '../../utils/object-utils';
import { CompCtrlDirective } from '../compctrl/compctrl.directive';
import { ToasterService } from '../toaster/toaster.service';
import { ToastrService } from '../toastr.service';
import { FormBaseComponent } from './form-base.component';

@Injectable()
export abstract class FormComponent implements OnDestroy {

    public abstract formView: FormBaseComponent;
    public abstract pageTitle: string;

    public loginService: LoginService;
    public toasterService: ToasterService;
    public toastrService: ToastrService;
    public router: Router;
    public route: ActivatedRoute;

    private disabledElements: any[] = [];

    public subscriptions: Subscription[] = [];

    constructor(
        protected readonly injector: Injector,
    ) {
        this.loginService = injector.get(LoginService);
        this.toasterService = injector.get(ToasterService);
        this.toastrService = injector.get(ToastrService);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(it => it.unsubscribe());
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

    public validateForm(): boolean {
        return this.validForm().size == 0;
    }

    public hasErrorMapped(error: any): boolean {
        return ObjectUtils.isNotEmpty(error) &&
            ((ObjectUtils.isNotEmpty(error.error) && !!error.error.mapped) ||
                (!!error.mapped));
    }

    public errorHandler(error: any, title?: string): void {
        if (!this.hasErrorMapped(error)) {
            return;
        } else {
            if (ObjectUtils.isEmpty(title)) {
                title = this.pageTitle;
            }

            let message: string = '';
            let errosCompCtrl: any = null;
            if ((ObjectUtils.isNotEmpty(error.error) && !!error.error.mapped)) {
                message = error.error.message;
                errosCompCtrl = error.error.erros;
            } else {
                message = error.message;
                errosCompCtrl = error.errors;
            }

            if (ObjectUtils.isNotEmpty(message)) {
                this.toastrService.showError(title, message);
            } else if (ObjectUtils.isNotEmpty(errosCompCtrl)) {
                for (const key in errosCompCtrl) {
                    const index = this.getFieldsCompCtrl()
                        .findIndex(it => it.compCtrl == key || it.compCtrl.toLocaleLowerCase().replaceAll(' ', '') == key);
                    if (index != -1) {
                        this.formView.contentFieldsCompCtrlForm.get(index).invalidate(errosCompCtrl[key]);
                    }
                }
            } else {
                console.error('Erro não mapeado:', error);
            }

        }
    }
}
