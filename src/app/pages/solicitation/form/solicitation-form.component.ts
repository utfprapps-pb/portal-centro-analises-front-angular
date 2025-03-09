import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { Solicitation } from '../model/solicitation.model';
import { SolicitationService } from '../solicitation.service';


@Component({
    selector: 'SolicitationFormComponent',
    templateUrl: './solicitation-form.component.html',
    styleUrl: './solicitation-form.component.scss'
})
export class SolicitationFormComponent extends FormCrud<Solicitation> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitationService
    ) {
        super(injector, service);
    }

}
