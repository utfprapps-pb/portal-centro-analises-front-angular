import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { SolicitationHistoric } from './model/solicitation-historic.model';
import { Solicitation } from './model/solicitation.model';

@Injectable({
    providedIn: 'root'
})
export class SolicitationService extends GenericCrudService<Solicitation> {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/solicitacoes', Solicitation)
    }

    public buscarHistorico(): Promise<SolicitationHistoric[]> {
        return this.http.get(`${this.path}/buscar-historicos`)
    }

}
