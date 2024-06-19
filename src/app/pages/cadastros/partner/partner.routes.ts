import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartnerFormComponent } from './form/partner-form.component';
import { PartnerListComponent } from './list/partner-list.component';

const routes: Routes = [
    {
        path: '', component: PartnerListComponent,
    },
    {
        path: ':action',
        component: PartnerFormComponent,
    },
    {
        path: ':action/:id',
        component: PartnerFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: PartnerFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PartnerRoutes { }
