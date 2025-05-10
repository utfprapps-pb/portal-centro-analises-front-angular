import { Injectable } from '@angular/core';

import { HttpClientService } from '../../core/services/httpclient.service';
import { GenericService } from '../../generics/generic.service';
import { ReportDTO } from './model/report.dto';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends GenericService {

    constructor(
        protected override http: HttpClientService,
    ) {
        super(http, '/relatorios')
    }

    public gerar(id: number): Promise<Blob> {
        return this.http.getReturnBlob(`${this.url}/gerar/${id}`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    public getAllFinanceiros(): Promise<ReportDTO[]> {
        return this.http.get(`${this.url}/financeiros`);
    }

}
