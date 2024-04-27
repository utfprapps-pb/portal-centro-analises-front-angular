import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { DomainService } from '../domain.service';
import { Domain } from '../model/domain.model';

@Component({
    selector: 'DomainFormComponent',
    templateUrl: './domain-form.component.html',
    styleUrl: './domain-form.component.scss'
})
export class DomainFormComponent extends FormCrud<Domain> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: DomainService,
    ) {
        super(injector, service);
    }

}
