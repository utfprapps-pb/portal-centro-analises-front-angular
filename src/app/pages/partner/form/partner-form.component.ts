import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { Partner } from '../model/partner.model';
import { PartnerService } from '../partner.service';

@Component({
    selector: 'PartnerFormComponent',
    templateUrl: './partner-form.component.html',
    styleUrl: './partner-form.component.scss'
})
export class PartnerFormComponent extends FormCrud<Partner> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: PartnerService,
    ) {
        super(injector, service);
    }

}
