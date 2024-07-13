import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentTeacherFormComponent } from './form/studentteacher-form.component';
import { StudentTeacherListComponent } from './list/studentteacher-list.component';

const routes: Routes = [
    {
        path: '', component: StudentTeacherListComponent,
    },
    {
        path: ':action',
        component: StudentTeacherFormComponent,
    },
    {
        path: ':action/:id',
        component: StudentTeacherFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: StudentTeacherFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentTeacherRoutes { }
