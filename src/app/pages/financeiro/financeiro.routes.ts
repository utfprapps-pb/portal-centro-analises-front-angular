import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinanceiroFormComponent } from './form/financeiro-form.component';
import { FinanceiroListComponent } from './list/financeiro-list.component';

const routes: Routes = [
    {
        path: '', component: FinanceiroListComponent,
    },
    {
        path: ':action',
        component: FinanceiroFormComponent,
    },
    {
        path: ':action/:id',
        component: FinanceiroFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: FinanceiroFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FinanceiroRoutes { }
