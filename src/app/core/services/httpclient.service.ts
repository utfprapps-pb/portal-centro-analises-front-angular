import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    constructor(
        protected http: HttpClient
    ) {
        this.http = http;
    }

    private fixUrl(url: string): string {
        return `${environment.apiUrl}` + (`/${url.replaceAll('//', '/').replace(environment.apiUrl, '')}`).replaceAll('//', '/');
    }

    public post(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.fixUrl(url)}`, body, { observe: 'body' }).subscribe(
                (entity) => {
                    resolve(entity);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    public get(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.fixUrl(url)}`, { observe: 'body' }).subscribe(
                (entity) => {
                    resolve(entity);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

}
