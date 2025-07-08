import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { Finance } from './model/finance.model';


@Injectable({
    providedIn: 'root'
})
export class FinanceiroService extends GenericCrudService<Finance> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/financeiro', Finance)
    }

}
