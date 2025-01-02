import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import pageSettings from '../../core/constants/page-settings';
import { Roles } from '../../core/enums/roles.enum';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from '../../core/services/toastr.service';
import { ToasterService } from '../../core/toaster/toaster.service';
import { GenericService } from '../../generics/generic.service';
import { LoginService } from '../../login/login.service';
import { ObjectUtils } from '../../utils/object-utils';
import { CompCtrlDirective } from '../compctrl/compctrl.directive';
import { ConvertUtilsService } from './../../utils/convert-utils.service';
import { FormBaseComponent } from './form-base.component';

@Injectable()
export abstract class FormBase implements OnDestroy {

    public abstract formView: FormBaseComponent;

    public isAdmin: boolean = false;
    public isProfessor: boolean = false;
    public isAluno: boolean = false;
    public isPartner: boolean = false;
    public isExterno: boolean = false;

    public pageSettings = pageSettings;

    public loginService: LoginService;
    public toasterService: ToasterService;
    public toastrService: ToastrService;
    public router: Router;
    public route: ActivatedRoute;
    public authentication: AuthService;
    public convertUtilsService: ConvertUtilsService;

    private disabledElements: any[] = [];

    public subscriptions: Subscription[] = [];

    get pageTitle() {
        return this.formView?.pageTitle;
    }

    constructor(
        protected readonly injector: Injector,
        protected readonly service: GenericService,
    ) {
        this.loginService = injector.get(LoginService);
        this.toasterService = injector.get(ToasterService);
        this.toastrService = injector.get(ToastrService);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.authentication = injector.get(AuthService);
        this.convertUtilsService = injector.get(ConvertUtilsService);

        if (!!this.authentication.getUserLogged()) {
            this.isAdmin = Roles.ROLE_ADMIN == this.authentication.getUserLogged().role;
            this.isProfessor = Roles.ROLE_PROFESSOR == this.authentication.getUserLogged().role;
            this.isAluno = Roles.ROLE_STUDENT == this.authentication.getUserLogged().role;
            this.isPartner = Roles.ROLE_PARTNER == this.authentication.getUserLogged().role;
            this.isExterno = Roles.ROLE_EXTERNAL == this.authentication.getUserLogged().role;
        }
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

    protected getFormBaseToDisable(): any {
        return this.formView.formBase.first.nativeElement;
    }

    public disableForm(value: boolean = true) {
        let aux: any[] = this.getFormBaseToDisable().querySelectorAll(this.getFocusableElementstring());
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

    private validForm(alert: boolean): Map<string, boolean> {
        const mapResult = new Map<string, boolean>();

        const fieldsRequired = this.getFieldsCompCtrl().filter(it => it['_required']);

        let firstInvalidField: CompCtrlDirective;;
        for (const field of fieldsRequired) {
            if (!field.validate(false, alert)) {
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
                mapResult.set(field.compCtrl, false);
            }
        }
        if (alert) {
            if (!!firstInvalidField) {
                firstInvalidField.setFocus();
            }
        }

        return mapResult;
    }

    public validateForm(alert: boolean = true): boolean {
        return this.validForm(alert).size == 0;
    }

    public getPageTitle(): string {
        if (!this.pageTitle) {
            let title = document.title;
            if (title.includes('|')) {
                title = title.substring(title.indexOf('|' + 1));
            }
            if (!!this.formView) {
                this.formView.pageTitle = title;
            }
        }
        return this.pageTitle;
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
                title = this.getPageTitle();
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
