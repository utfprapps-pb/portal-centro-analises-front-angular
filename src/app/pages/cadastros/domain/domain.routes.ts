import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DomainFormComponent } from './form/domain-form.component';
import { DomainListComponent } from './list/domain-list.component';

const routes: Routes = [
    {
        path: '', component: DomainListComponent,
    },
    {
        path: ':action',
        component: DomainFormComponent,
    },
    {
        path: ':action/:id',
        component: DomainFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: DomainFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DomainRoutes { }
