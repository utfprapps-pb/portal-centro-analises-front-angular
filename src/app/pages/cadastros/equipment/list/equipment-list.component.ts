import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../../components/form-list/form-list';
import { FormListComponent } from '../../../../components/form-list/form-list.component';
import { EquipmentService } from '../equipment.service';
import { Equipment } from '../model/equipment.model';

@Component({
    selector: 'EquipmentListComponent',
    templateUrl: './equipment-list.component.html',
    styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent extends FormList<Equipment> {

    @ViewChild('formView') public formView: FormListComponent<Equipment>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: EquipmentService,
    ) {
        super(injector, service);
    }

}
