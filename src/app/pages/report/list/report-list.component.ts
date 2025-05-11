import { Component, Injector, ViewChild } from '@angular/core';

import { FormReport } from '../../../components/form-report/form-report';
import { FormReportComponent } from '../../../components/form-report/form-report.component';
import { ReportCardModel } from '../report-card/report-card.model';
import { ReportService } from '../report.service';

@Component({
    selector: 'ReportListComponent',
    templateUrl: './report-list.component.html',
    styleUrl: './report-list.component.scss'
})
export class ReportListComponent extends FormReport {

    public static readonly SOLICITACOES_COLOR: string = '#007bff';
    public static readonly EQUIPAMENTOS_COLOR: string = '#28a745';
    public static readonly USUARIOS_COLOR: string = '#ffc107';
    public static readonly FINANCEIRO_COLOR: string = '#dc3545';

    public static readonly SOLICITACOES_ICON: string = 'far fa-table-tree';
    public static readonly EQUIPAMENTOS_ICON: string = 'fa fa-dryer-heat';
    public static readonly USUARIOS_ICON: string = 'far fa-person';
    public static readonly FINANCEIRO_ICON: string = 'fa fa-money-bill-transfer';

    @ViewChild('formView') public formView: FormReportComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ReportService,
    ) {
        super(injector, service);
    }

    public cards: ReportCardModel[] = [
        {
            title: 'Solicitações',
            description: 'Relatórios de solicitações',
            icon: ReportListComponent.SOLICITACOES_ICON,
            color: ReportListComponent.SOLICITACOES_COLOR,
            visible: true,
            onClick: () => {
                this.downloadReport(3, 'Relatório de Solicitações');
            }
        },
        {
            title: 'Equipamentos',
            // description: 'Gerenciar equipamentos',
            icon: ReportListComponent.EQUIPAMENTOS_ICON,
            color: ReportListComponent.EQUIPAMENTOS_COLOR,
            visible: true,
            onClick: () => {
                this.downloadReport(2, 'Relatório de Equipamentos');
            }
        },
        {
            title: 'Financeiro',
            icon: ReportListComponent.FINANCEIRO_ICON,
            color: ReportListComponent.FINANCEIRO_COLOR,
            visible: true,
            onClick: () => {
                this.downloadReport(1, 'Relatório de Financeiro');
            },
        }
    ]

    private downloadReport(id: number, title: string): void {
        this.blockForm();
        this.service.gerar(id).then((response: Blob) => {
            this.toastrService.showSuccess(this.title, 'Relatório gerado com sucesso');
            const url = URL.createObjectURL(response);
            const temp = document.createElement('a');
            temp.href = url;
            temp.download = `${title}.xlsx`;
            temp.click();
            URL.revokeObjectURL(url);
        }, error => {
            if (this.hasErrorMapped(error)) {
                this.errorHandler(error);
            } else {
                this.toastrService.showError(this.title, 'Erro ao gerar relatório');
            }
        }).finally(() => this.releaseForm());
    }

}
