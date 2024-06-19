import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { EmailConfigService } from '../email-config.service';
import { EmailConfig } from '../model/emailconfig.model';

@Component({
    selector: 'EmailConfigFormComponent',
    templateUrl: './email-config-form.component.html',
    styleUrl: './email-config-form.component.scss'
})
export class EmailConfigFormComponent extends FormCrud<EmailConfig> {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: EmailConfigService,
    ) {
        super(injector, service);
    }

}
