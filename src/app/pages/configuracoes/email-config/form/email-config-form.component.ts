import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { EmailConfigService } from '../email-config.service';
import { EmailConfig } from '../model/emailconfig.model';

@Component({
    selector: 'EmailConfigFormComponent',
    templateUrl: './email-config-form.component.html',
    styleUrl: './email-config-form.component.scss'
})
export class EmailConfigFormComponent extends FormCrud<EmailConfig> implements OnInit {

    @ViewChild('formView') public formView: FormCrudComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: EmailConfigService,
    ) {
        super(injector, service);
    }

    public override getObjectIdFromUrl(): number {
        return 1;
    }

    public override showButtons(button: string): boolean {
        return !['excluir'].includes(button);
    }

}
