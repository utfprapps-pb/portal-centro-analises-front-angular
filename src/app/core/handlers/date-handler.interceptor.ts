import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ObjectUtils } from '../../utils/object-utils';

@Injectable({ providedIn: 'root' })
export class DateHttpInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const body = event.body;
                    this.deserialize(body);
                }
            })
        );
    }

    private deserialize(body: any): void {
        if (body === null || body === undefined) {
            return body;
        }

        if (typeof body !== 'object') {
            return body;
        }

        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isDate(value)) {
                const data = new Date(value);
                body[key] = new Date(data.setHours(0, 0, 0, 0));
            } else if (value != null && typeof value === 'object') {
                this.deserialize(value);
            }
        }
    }

    private isDate(value: any): boolean {
        if (ObjectUtils.isEmpty(value) || typeof(value) != 'string' || value.toString().length < 25) {
            return false;
        }
        const auxDate = new Date(value);
        return !isNaN(auxDate.getTime())
    }

}
