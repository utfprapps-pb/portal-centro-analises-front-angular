import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { EquipmentService } from '../equipment.service';
import { Equipment } from '../model/equipment.model';

@Component({
    selector: 'EquipmentFormComponent',
    templateUrl: './equipment-form.component.html',
    styleUrl: './equipment-form.component.scss'
})
export class EquipmentFormComponent extends FormCrud<Equipment> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: EquipmentService,
    ) {
        super(injector, service);
    }

}
