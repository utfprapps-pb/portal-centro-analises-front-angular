// import { Component, Injector, OnInit, ViewChild } from '@angular/core';
// import { error } from 'jquery';

// import { FormReport } from '../../../../components/form-report/form-report';
// import { FormReportComponent } from '../../../../components/form-report/form-report.component';
// import { ReportListComponent } from '../../list/report-list.component';
// import { ReportDTO } from '../../model/report.dto';
// import { ReportCardModel } from '../../report-card/report-card.model';
// import { ReportService } from '../../report.service';

// @Component({
//     selector: 'report-financeiro',
//     templateUrl: './report-financeiro.component.html',
// })
// export class ReportFinanceiroComponent extends FormReport implements OnInit {

//     @ViewChild('formView') public formView: FormReportComponent;

//     public reports: ReportCardModel[] = [];

//     constructor(
//         protected override readonly injector: Injector,
//         protected override readonly service: ReportService,
//     ) {
//         super(injector, service);
//     }

//     public ngOnInit(): void {
//         this.blockForm();
//         this.service.getAllFinanceiros().then((response: ReportDTO[]) => {
//             this.reports = response.map((report: ReportDTO) => {
//                 return {
//                     id: report.id,
//                     title: report.title,
//                     icon: ReportListComponent.FINANCEIRO_ICON,
//                     color: ReportListComponent.FINANCEIRO_COLOR,
//                     visible: true,
//                     onClick: () => {
//                         this.onClick(report);
//                     }
//                 };
//             });
//         }, error => {
//             if (this.hasErrorMapped(error)) {
//                 this.errorHandler(error);
//             } else {
//                 this.toastrService.showError(this.title, 'Erro ao carregar relatórios');
//             }
//         }).finally(() => this.releaseForm());
//     }

//     private onClick(report: ReportDTO): void {
//         this.blockForm();
//         this.service.gerar(report.id).then((response: Blob) => {
//             this.toastrService.showSuccess(this.title, 'Relatório gerado com sucesso');
//                     const url = URL.createObjectURL(response);
//                     const temp = document.createElement('a');
//                     temp.href = url;
//                     temp.download = `Relatório Financeiro.xlsx`;
//                     temp.click();
//                     URL.revokeObjectURL(url);
//         }, error => {
//             if (this.hasErrorMapped(error)) {
//                 this.errorHandler(error);
//             } else {
//                 this.toastrService.showError(this.title, 'Erro ao gerar relatório');
//             }
//         }).finally(() => this.releaseForm());
//     }
// }
