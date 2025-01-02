import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { Solicitation } from './model/solicitation.model';

@Injectable({
    providedIn: 'root'
})
export class SolicitarService extends GenericCrudService<Solicitation> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/solicitar', Solicitation)
    }

}
