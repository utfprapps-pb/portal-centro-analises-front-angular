import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportListComponent } from './list/report-list.component';
import { ReportEquipamentosComponent } from './reports/report-equipamentos/report-equipamentos.component';
import { ReportSolicitacoesComponent } from './reports/report-solicitacoes/report-solicitacoes.component';
import { ReportUsuariosComponent } from './reports/report-usuarios/report-usuarios.component';


const routes: Routes = [
    { path: '', component: ReportListComponent },
    { path: 'equipamentos', component: ReportEquipamentosComponent },
    { path: 'solicitacoes', component: ReportSolicitacoesComponent },
    { path: 'usuarios', component: ReportUsuariosComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportRoutes { }
