import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { ProjectFormComponent } from './form/project-form.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectRoutes } from './project.routes';


@NgModule({
    declarations: [
        ProjectFormComponent,
        ProjectListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        ProjectRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class ProjectModule { }
