import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserFormComponent } from './form/user-form.component';
import { UserListComponent } from './list/user-list.component';

const routes: Routes = [
    {
        path: '', component: UserListComponent,
    },
    {
        path: ':action',
        component: UserFormComponent,
    },
    {
        path: ':action/:id',
        component: UserFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: UserFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutes { }
