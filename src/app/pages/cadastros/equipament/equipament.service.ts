import { Injectable } from '@angular/core';

import { Equipament } from './model/equipament.model';
import { HttpClientService } from '../../../core/services/httpclient.service';
import { GenericCrudService } from '../../../generics/generic-crud.service';

@Injectable({
    providedIn: 'root'
})
export class EquipamentService extends GenericCrudService<Equipament> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/equipamentos', Equipament)
    }

}
