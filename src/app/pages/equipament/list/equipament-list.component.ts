import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { EquipamentService } from '../equipament.service';
import { Equipament } from '../model/equipament.model';

@Component({
    selector: 'EquipamentListComponent',
    templateUrl: './equipament-list.component.html',
    styleUrl: './equipament-list.component.scss'
})
export class EquipamentListComponent extends FormList<Equipament> {

    @ViewChild('formView') public formView: FormListComponent<Equipament>;
    @ViewChild('formViewTable') public formViewDatatable: DatatableComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: EquipamentService,
    ) {
        super(injector, service);
    }

}
