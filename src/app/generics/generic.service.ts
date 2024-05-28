import { HttpClientService } from '../core/services/httpclient.service';
import { ObjectUtils } from '../utils/object-utils';


export abstract class GenericService {

    private _path: string;

    get path() {
        if (ObjectUtils.isEmpty(this._path)) {
            return '';
        } else {
            let retorno = this._path;
            if (this._path.startsWith('/')) {
                retorno = this._path;
            } else {
                retorno = `/${this._path}`
            }
            if (retorno.endsWith('/')) {
                retorno = retorno.substring(0, retorno.length - 1);
            }
            return retorno;
        }
    }

    constructor(
        protected http: HttpClientService,
        protected url: string,
    ) {
        this._path = url || '';
    }

    public getDatatable(page: number, size: number): Promise<any> {
        return this.http.get(`${this.path}/page?page=${page}&size=${size}`);
    }
}
