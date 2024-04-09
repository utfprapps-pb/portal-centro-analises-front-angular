import { Injectable } from '@angular/core';

import { HttpClientService } from '../core/services/httpclient.service';
import { GenericService } from '../generics/generic.service';
import { Login } from './model/login.model';
import { PasswordRecover } from './model/password-recover.model';
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

    public recoverPassword(recover: PasswordRecover): Promise<any> {
        return this.http.post(`${this.path}/recover-password`, recover);
    }

    public sendCodeRecoverPassword(email: string): Promise<any> {
        return this.http.post(`${this.path}/send-code-recover-password/email/${email}`, null);
    }

    public requestValidation(email: string): Promise<any> {
        return this.http.post(`${this.path}/request-verification`, { email: email });
    }
}
