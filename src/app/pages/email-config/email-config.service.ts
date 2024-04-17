import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { EmailConfig } from './model/emailconfig.model';

@Injectable({
    providedIn: 'root'
})
export class EmailConfigService extends GenericCrudService<EmailConfig> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/email/config', EmailConfig)
    }

    public override findOne(): Promise<any> {
        return this.findAll();
    }

}
