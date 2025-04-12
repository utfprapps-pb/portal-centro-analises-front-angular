import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { SolicitationAmostra } from './model/solicitation-amostra.model';
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

    public buscarHistoricoById(id: number): Promise<SolicitationHistoric[]> {
        return this.http.get(`${this.path}/buscar-historicos/${id}`)
    }

    public atualizarStatus(historic: SolicitationHistoric): Promise<Solicitation> {
        return this.http.put(`${this.path}/atualizar-status`, historic);
    }

    public saveAnalise(amostra: SolicitationAmostra): Promise<void> {
        return this.http.post(`${this.path}/salvar/solicitacao-amostra-analise`, amostra);
    }

    public finalizarAmostra(amostra: SolicitationAmostra): Promise<void> {
        return this.http.post(`${this.path}/salvar/solicitacao-amostra-finalizar`, amostra);
    }

}
