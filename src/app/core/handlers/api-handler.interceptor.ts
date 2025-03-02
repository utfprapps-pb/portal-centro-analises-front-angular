import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiHandlerService } from '../services/api-handler.service';

@Injectable()
export class ApiHandlerInterceptor implements HttpInterceptor {

    constructor(
        private readonly apiHandlerService: ApiHandlerService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const prefix: string = environment.apiUrl;
        if (req.url.startsWith(prefix)) {
            return next.handle(req);
        } else {
            const clonedReq = req.clone({ url: this.apiHandlerService.getEndpoint(req.url) });
            return next.handle(clonedReq);
        }
    }
}
