import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    constructor(
        protected http: HttpClient
    ) {
        this.http = http;
    }

    public post(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(url, body, { observe: 'body' }).subscribe(
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
            this.http.get(url, { observe: 'body', responseType: 'json' }).subscribe(
                (entity) => {
                    resolve(entity);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    public put(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(url, body, { observe: 'body' }).subscribe(
                (entity) => {
                    resolve(entity);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    public getReturnText(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(url, { observe: 'body', responseType: 'text' }).subscribe(
                (entity) => {
                    resolve(entity);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    public delete(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(url, { observe: 'body' }).subscribe(
                (entity) => {
                    resolve(entity);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

}
