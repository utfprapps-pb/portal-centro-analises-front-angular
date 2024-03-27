import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericService } from '../../generics/generic.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends GenericService<any> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/home')
    }

}
