import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { Partner } from '../model/partner.model';
import { PartnerService } from '../partner.service';

@Component({
    selector: 'PartnerListComponent',
    templateUrl: './partner-list.component.html',
    styleUrl: './partner-list.component.scss'
})
export class PartnerListComponent extends FormList<Partner> {

    @ViewChild('formView') public formView: FormListComponent<Partner>;
    @ViewChild('formViewTable') public formViewDatatable: DatatableComponent;

    public objects: any[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: PartnerService,
    ) {
        super(injector, service);
    }

}
