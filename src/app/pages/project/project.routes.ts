import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectFormComponent } from './form/project-form.component';
import { ProjectListComponent } from './list/project-list.component';

const routes: Routes = [
    {
        path: '', component: ProjectListComponent,
    },
    {
        path: ':action',
        component: ProjectFormComponent,
    },
    {
        path: ':action/:id',
        component: ProjectFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: ProjectFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectRoutes { }
