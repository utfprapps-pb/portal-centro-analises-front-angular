import { Injectable } from '@angular/core';

import { HttpClientService } from '../core/services/httpclient.service';
import { RecoverPasswordDTO } from '../dtos/recover-password.dto';
import { RequestCodeEmailDTO } from '../dtos/request-email-code.dto';
import { GenericService } from '../generics/generic.service';
import { Login } from './model/login.model';
import { RegisterUser } from './model/register-user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService extends GenericService {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/users')
    }

    public createNewUser(object: RegisterUser): Promise<any> {
        return this.http.post(`${this.path}/save`, object);
    }

    public login(login: Login): Promise<any> {
        return this.http.post('/login', login);
    }

    public recoverPassword(recover: RecoverPasswordDTO): Promise<any> {
        return this.http.post(`${this.path}/recover-password`, recover);
    }

    public sendCodeRecoverPassword(email: string): Promise<any> {
        return this.http.post(`${this.path}/send-code-recover-password/email/${email}`, null);
    }

    public requestValidation(email: string): Promise<any> {
        const request: RequestCodeEmailDTO = new RequestCodeEmailDTO()
        request.email = email;
        return this.http.post(`${this.path}/request-verification`, request);
    }
}
