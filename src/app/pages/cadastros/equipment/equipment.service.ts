import { Injectable } from '@angular/core';

import { HttpClientService } from '../../../core/services/httpclient.service';
import { GenericCrudService } from '../../../generics/generic-crud.service';
import { Equipment } from './model/equipment.model';

@Injectable({
    providedIn: 'root'
})
export class EquipmentService extends GenericCrudService<Equipment> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/equipamentos', Equipment)
    }

}
