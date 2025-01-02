import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { HomeFormComponent } from './form/home-form.component';
import { HomeRoutes } from './home.routes';



@NgModule({
    declarations: [
        HomeFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HomeRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class HomeModule { }
