import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { EquipamentService } from '../equipament.service';
import { Equipament } from '../model/equipament.model';

@Component({
    selector: 'EquipamentFormComponent',
    templateUrl: './equipament-form.component.html',
    styleUrl: './equipament-form.component.scss'
})
export class EquipamentFormComponent extends FormCrud<Equipament> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: EquipamentService,
    ) {
        super(injector, service);
    }

}
