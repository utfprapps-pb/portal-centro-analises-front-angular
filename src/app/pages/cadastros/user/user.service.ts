import { Injectable } from '@angular/core';

import { Roles } from '../../../core/enums/roles.enum';
import { HttpClientService } from '../../../core/services/httpclient.service';
import { UserDTO } from '../../../dtos/user.dto';
import { GenericCrudService } from '../../../generics/generic-crud.service';
import { User } from './model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends GenericCrudService<User> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/usuarios', User)
    }

    public findAllByRole(role: Roles): Promise<UserDTO[]> {
        return this.http.get(`${this.path}/role/${role}`);
    }

    public findAllByDomain(domain: String): Promise<UserDTO[]> {
        return this.http.get(`${this.path}/domain/${domain}`);
    }

}
