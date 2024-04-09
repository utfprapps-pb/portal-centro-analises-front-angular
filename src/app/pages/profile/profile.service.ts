import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { User } from './model/user.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends GenericCrudService<User> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/users', User)
    }

}
