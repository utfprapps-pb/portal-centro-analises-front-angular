import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitationFormComponent } from './form/solicitation-form.component';
import { SolicitationListComponent } from './list/solicitation-list.component';

const routes: Routes = [
    {
        path: '', component: SolicitationListComponent,
    },
    {
        path: ':action',
        component: SolicitationFormComponent,
    },
    {
        path: ':action/:id',
        component: SolicitationFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: SolicitationFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SolicitationRoutes { }
