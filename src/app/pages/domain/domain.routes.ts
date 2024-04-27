import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DomainFormComponent } from './form/domain-form.component';
import { DomainListComponent } from './list/domain-list.component';

const routes: Routes = [
    {
        path: '', component: DomainListComponent,
        //canActivate: [AuthGuard.canActivate],
    },
    {
        path: ':action',
        component: DomainFormComponent,
        //canActivate: [AuthGuard.canActivate],
    },
    {
        path: ':action/:id',
        component: DomainFormComponent,
        //canActivate: [AuthGuard.canActivate],
    },
    {
        path: ':action/:event/:id',
        component: DomainFormComponent,
        //canActivate: [AuthGuard.canActivate],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DomainRoutes { }
