import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
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

}
