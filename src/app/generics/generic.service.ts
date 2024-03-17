import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

export abstract class GenericService {

    private _path: string;

    get path() {
        if (this._path != null) {
            return `${environment.apiUrl}/${this._path}`
        } else {
            return `${environment.apiUrl}`
        }
    }

    constructor(
        protected http: HttpClient,
        protected url: string,
    ) {
        this._path = url;
    }

}
