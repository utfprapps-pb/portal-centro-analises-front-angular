import { Injectable } from '@angular/core';

import { GenericService } from '../../generics/generic.service';
import { HttpClientService } from './httpclient.service';

@Injectable({
    providedIn: 'root'
})
export class OpenService extends GenericService {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/open')
    }

    public findParceirosAcademicos(): Promise<string[]> {
        return this.http.get(`${this.path}/academicos`);
    }

}
