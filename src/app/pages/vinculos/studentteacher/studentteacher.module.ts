import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../../components/components.module';
import { StudentTeacherFormComponent } from './form/studentteacher-form.component';
import { StudentTeacherListComponent } from './list/studentteacher-list.component';
import { StudentTeacherRoutes } from './studentteacher.routes';

@NgModule({
    declarations: [
        StudentTeacherFormComponent,
        StudentTeacherListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        StudentTeacherRoutes,
    ]
})
export class StudentTeacherModule { }
