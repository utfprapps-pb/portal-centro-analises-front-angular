import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { DomainService } from '../domain.service';
import { Domain } from '../model/domain.model';

@Component({
    selector: 'DomainListComponent',
    templateUrl: './domain-list.component.html',
    styleUrl: './domain-list.component.scss'
})
export class DomainListComponent extends FormList<Domain> {

    @ViewChild('formView') public formView: FormListComponent<Domain>;
    @ViewChild('formViewTable') public formViewDatatable: DatatableComponent;

    public objects: any[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: DomainService,
    ) {
        super(injector, service);
    }

}
