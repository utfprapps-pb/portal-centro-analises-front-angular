import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Constants } from '../constants/constants';
import { StorageManager } from '../managers/storage-manager';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authentication: AuthService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url) {
            return next.handle(request);
        }

        const authtoken = this.authentication.getToken();
        if (authtoken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authtoken}`,
                    Credentials: `${btoa(StorageManager.getItem(Constants.USER))}`
                },
            });
        }

        return next.handle(request);
    }

}
