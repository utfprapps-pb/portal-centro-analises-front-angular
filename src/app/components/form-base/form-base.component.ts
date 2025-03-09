import {
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    Injector,
    Input,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { CompCtrlDirective } from '../../core/directives/compctrl/compctrl.directive';
import { ToasterService } from '../../core/toaster/toaster.service';
import { Stack } from '../../utils/models/stack';
import { DialogService } from './../../core/services/dialog.service';
import { ToastrService } from './../../core/services/toastr.service';

@Component({
    selector: 'form-base',
    templateUrl: './form-base.component.html',
    styleUrl: './form-base.component.scss'
})
export class FormBaseComponent implements AfterViewInit {

    @ViewChildren('formBase') formBase: QueryList<ElementRef>;
    @ContentChildren(CompCtrlDirective, { descendants: true }) contentFieldsCompCtrlForm: QueryList<CompCtrlDirective>;
    @Input() enableBreadcrumb: boolean = true;

    @Input() pageTitle: string;
    @Input() changeTitle: boolean = true;

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

    public ngAfterViewInit(): void {
        if (this.changeTitle) {
            document.title = `UTFPR | ${this.pageTitle || 'LCA'}`;
        }
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
