import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
        HttpClientModule,
        ComponentsModule,
        HomeRoutes,
    ]
})
export class HomeModule { }
