import { HttpClientService } from '../core/services/httpclient.service';
import { GenericService } from './generic.service';
import { ZObject } from './zobject';


export abstract class GenericCrudService<T extends ZObject> extends GenericService {

    constructor(
        protected override http: HttpClientService,
        protected override url: string,
        protected model: any
    ) {
        super(http, url);
    }

    public createInstance(): T {
        return this.model.createInstance();
    }

    public save(object: T): Promise<any> {
        return this.http.post(`${this.path}/save`, object);
    }

    public findOne(id: number): Promise<any> {
        return this.http.post(`${this.path}/${id}`, null);
    }

    public findAll(): Promise<any> {
        return this.http.get(`${this.path}`);
    }

    public getDatatable(page: number, size: number): Promise<any> {
        return this.http.get(`${this.path}/page?page=${page}&size=${size}`);
    }

}
