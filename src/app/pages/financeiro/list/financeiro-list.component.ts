import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { FinanceiroService } from '../financeiro.service';
import { Finance } from '../model/finance.model';


@Component({
    selector: 'FinanceiroListComponent',
    templateUrl: './financeiro-list.component.html',
    styleUrl: './financeiro-list.component.scss'
})
export class FinanceiroListComponent extends FormList<Finance> {

    @ViewChild('formView') public formView: FormListComponent<Finance>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    private userID = this.authentication.getUserLogged().id;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: FinanceiroService,
    ) {
        super(injector, service);
    }

    public allowDeleteRow(): boolean {
        return this.isAdmin;
    }

    public override showButtons(button: string): boolean {
        if (button == 'cancelar') {
            return true;
        } else {
            return this.isAdmin;
        }
    }

}
