import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { Partner } from './model/partner.model';

@Injectable({
    providedIn: 'root'
})
export class PartnerService extends GenericCrudService<Partner> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/parceiros', Partner)
    }


}
