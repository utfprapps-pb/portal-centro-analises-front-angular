import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { ReportListComponent } from './list/report-list.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { ReportRoutes } from './report.routes';
import { ReportEquipamentosComponent } from './reports/report-equipamentos/report-equipamentos.component';
import { ReportSolicitacoesComponent } from './reports/report-solicitacoes/report-solicitacoes.component';
import { ReportUsuariosComponent } from './reports/report-usuarios/report-usuarios.component';

@NgModule({
    declarations: [
        ReportCardComponent,

        ReportEquipamentosComponent,
        ReportSolicitacoesComponent,
        ReportUsuariosComponent,
        ReportListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        ReportRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class ReportModule { }
