import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { TermsOfUse } from '../model/termsofuse.model';
import { TermsOfUseService } from '../termsofuse.service';


@Component({
    selector: 'TermsOfUseFormComponent',
    templateUrl: './termsofuse-form.component.html',
    styleUrl: './termsofuse-form.component.scss'
})
export class TermsOfUseFormComponent extends FormCrud<TermsOfUse> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: TermsOfUseService,
    ) {
        super(injector, service);
    }

}
