import { Injectable } from '@angular/core';

import { HttpClientService } from '../../../core/services/httpclient.service';
import { GenericCrudService } from '../../../generics/generic-crud.service';
import { Domain } from './model/domain.model';

@Injectable({
    providedIn: 'root'
})
export class DomainService extends GenericCrudService<Domain> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/dominios', Domain)
    }

}
