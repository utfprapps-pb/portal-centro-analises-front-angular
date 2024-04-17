import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { ChangePasswordDTO } from '../../dtos/change-password.dto';
import { UserDTO } from '../../dtos/user.dto';
import { GenericCrudService } from '../../generics/generic-crud.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends GenericCrudService<UserDTO> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/users', UserDTO)
    }

    public override findOne(): Promise<any> {
        return new Promise(() => {});
    }

    public changePassword(change: ChangePasswordDTO): Promise<any> {
        return this.http.post(`${this.path}/change-password`, change);
    }
}
