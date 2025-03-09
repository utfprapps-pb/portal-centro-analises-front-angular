import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { TermsOfUse } from '../model/termsofuse.model';
import { TermsOfUseService } from '../termsofuse.service';


@Component({
    selector: 'TermsOfUseListComponent',
    templateUrl: './termsofuse-list.component.html',
    styleUrl: './termsofuse-list.component.scss'
})
export class TermsOfUseListComponent extends FormList<TermsOfUse> {

    @ViewChild('formView') public formView: FormListComponent<TermsOfUse>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    private userID = this.authentication.getUserLogged().id;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: TermsOfUseService,
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
            return !this.isAluno;
        }
    }

}
