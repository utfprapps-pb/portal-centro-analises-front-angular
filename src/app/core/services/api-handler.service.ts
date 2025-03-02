import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ObjectUtils } from '../../utils/object-utils';


@Injectable({ providedIn: 'root' })
export class ApiHandlerService {

    private static endpointPrefix = '';

    private static setEndpointPrefix(endpointPrefix: string): void {
        ApiHandlerService.endpointPrefix = endpointPrefix;
    }

    public getEndpoint(api: string): string {
        return ApiHandlerService.getEndpoint(api,);
    }

    public static getEndpoint(url: string): string {
        if (ObjectUtils.isEmpty(this.endpointPrefix)) {
            ApiHandlerService.setEndpointPrefix(environment.apiUrl);
        }

        let apiClone: string = String(url);
        if (apiClone[0] != '/') {
            apiClone = `/${apiClone}`
        }
        if (apiClone.startsWith(this.endpointPrefix)) {
            apiClone = apiClone.replace(this.endpointPrefix, '');
        }

        apiClone =  (`/${url.replaceAll('//', '/').replace(environment.apiUrl, '')}`).replaceAll('//', '/');
        return `${this.endpointPrefix}${apiClone}`;
    }

}
