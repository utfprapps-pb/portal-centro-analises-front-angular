import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { TermsOfUse } from './model/termsofuse.model';


@Injectable({
    providedIn: 'root'
})
export class TermsOfUseService extends GenericCrudService<TermsOfUse> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/termos-de-uso', TermsOfUse)
    }

}
