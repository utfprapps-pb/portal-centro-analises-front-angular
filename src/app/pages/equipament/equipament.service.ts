import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { Equipament } from './model/equipament.model';

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
