import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsOfUseFormComponent } from './form/termsofuse-form.component';
import { TermsOfUseListComponent } from './list/termsofuse-list.component';

const routes: Routes = [
    {
        path: '', component: TermsOfUseListComponent,
    },
    {
        path: ':action',
        component: TermsOfUseFormComponent,
    },
    {
        path: ':action/:id',
        component: TermsOfUseFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: TermsOfUseFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TermsOfUseRoutes { }
