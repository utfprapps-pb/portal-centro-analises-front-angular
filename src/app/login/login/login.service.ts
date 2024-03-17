import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, flatMap, of } from 'rxjs';

import { GenericService } from '../../generics/generic.service';
import { Login } from './model/login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService extends GenericService {

    constructor(
        protected override http: HttpClient
    ) {
        super(http, null)
    }

    public login(login: Login): Observable<any> {
        return this.http.post(`${this.path}/login`, login, { observe: 'body' }).pipe(
            flatMap((entity: any) => {
                if (entity) {
                    return of(entity);
                } else {
                    return null;
                }
            })
        );
    }
}
