import { Component, Injector, ViewChild } from '@angular/core';

import { FormReport } from '../../../../components/form-report/form-report';
import { FormReportComponent } from '../../../../components/form-report/form-report.component';
import { ReportService } from '../../report.service';

@Component({
    selector: 'report-equipamentos',
    templateUrl: './report-equipamentos.component.html',
    styleUrl: './report-equipamentos.component.scss'
})
export class ReportEquipamentosComponent extends FormReport {

    @ViewChild('formView') public formView: FormReportComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ReportService,
    ) {
        super(injector, service);
    }

}
