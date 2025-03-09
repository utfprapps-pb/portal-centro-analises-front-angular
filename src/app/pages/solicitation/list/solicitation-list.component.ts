import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { getEnumColor } from '../../../core/enums/enum-mapper';
import { SolicitationHistoric } from '../model/solicitation-historic.model';
import { Solicitation } from '../model/solicitation.model';
import { SolicitationService } from '../solicitation.service';


@Component({
    selector: 'SolicitationListComponent',
    templateUrl: './solicitation-list.component.html',
    styleUrl: './solicitation-list.component.scss'
})
export class SolicitationListComponent extends FormList<Solicitation> {

    @ViewChild('formView') public formView: FormListComponent<Solicitation>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    private mapSolicitacaoHistorico: Map<number, SolicitationHistoric[]> = new Map();

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitationService,
    ) {
        super(injector, service);
    }

    public loadHistoricos(): void {
        this.blockForm();
        this.mapSolicitacaoHistorico = new Map();
        this.service.buscarHistorico().then(data => {
            for (const historico of data) {
                const idSolicitacao = historico.solicitation.id;
                if (!this.mapSolicitacaoHistorico.has(idSolicitacao)) {
                    this.mapSolicitacaoHistorico.set(idSolicitacao, []);
                }
                this.mapSolicitacaoHistorico.get(idSolicitacao).push(historico);
            }
            for (const [key, value] of this.mapSolicitacaoHistorico.entries()) {
                value.sort((a, b) => a.id - b.id);
            }
        }).finally(() => this.releaseForm());
    }

    public allowRowExpand(data: Solicitation): boolean {
        return this.mapSolicitacaoHistorico.has(data.id);
    }

    public getHistoricos(solicitacao: Solicitation): SolicitationHistoric[] {
        return this.mapSolicitacaoHistorico.get(solicitacao.id) || [];
    }

    private mappedColors: Map<string, string> = new Map();
    public getEnumColor(value: string): string {
        if (!this.mappedColors.has(value)) {
            this.mappedColors.set(value, getEnumColor('SolicitationStatus', value))
        }
return this.mappedColors.get(value);


    }
}
