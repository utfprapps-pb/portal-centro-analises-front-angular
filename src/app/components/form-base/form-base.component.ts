import { Component, ContentChildren, ElementRef, Injector, Input, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { ToasterService } from '../../core/toaster/toaster.service';
import { Stack } from '../../utils/models/stack';
import { CompCtrlDirective } from '../compctrl/compctrl.directive';
import { DialogService } from './../../core/services/dialog.service';
import { ToastrService } from './../../core/services/toastr.service';

@Component({
    selector: 'form-base',
    templateUrl: './form-base.component.html',
    styleUrl: './form-base.component.scss'
})
export class FormBaseComponent {

    @ViewChildren('formBase') formBase: QueryList<ElementRef>;
    @ContentChildren(CompCtrlDirective, { descendants: true }) contentFieldsCompCtrlForm: QueryList<CompCtrlDirective>;
    @Input() enableBreadcrumb: boolean = true;
    @Input() pageTitle: string;

    public facades: Stack<number> = new Stack();
    public toasterService: ToasterService;
    public toastrService: ToastrService;
    public dialogService: DialogService;
    public router: Router;

    public breadCrumbHome: MenuItem = { icon: 'fa fa-home', routerLink: '/' };

    constructor(
        protected readonly injector: Injector
    ) {
        this.toasterService = injector.get(ToasterService);
        this.toastrService = injector.get(ToastrService);
        this.dialogService = injector.get(DialogService);
        this.router = injector.get(Router);
    }

    public blockForm(): void {
        this.facades.push(this.facades.size());
    }

    public releaseForm(force: boolean = false): boolean {
        if (force) {
            this.facades.clear();
        } else {
            this.facades.pop();
        }
        return this.facades.isEmpty();
    }

    public getBreadcrumbItens(): MenuItem[] {
        const itens: MenuItem[] = [];
        // console.log(this.router.url)
        return itens.length > 0 ? itens : null;
    }

}
