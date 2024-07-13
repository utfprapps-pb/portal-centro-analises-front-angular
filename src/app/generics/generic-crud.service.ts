import { HttpClientService } from '../core/services/httpclient.service';
import { ObjectUtils } from '../utils/object-utils';
import { GenericService } from './generic.service';
import { ZModel } from './zmodel';


export abstract class GenericCrudService<T extends ZModel> extends GenericService {

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

    public save(object: T): Promise<T> {
        if (ObjectUtils.isNotEmpty(object.id)) {
            return this.http.post(`${this.path}/update`, object);
        } else {
            return this.http.post(`${this.path}/save`, object);
        }
    }

    public delete(id: number): Promise<void> {
        return this.http.delete(`${this.path}/${id}`);
    }

    public findOne(id: number): Promise<T> {
        return this.http.post(`${this.path}/${id}`, null);
    }

    public findAll(): Promise<T[]> {
        return this.http.get(`${this.path}`);
    }

}
