import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './../components/components.module';
import { LoginFormComponent } from './form/login-form.component';
import { LoginRoutes } from './login.routes';



@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutes,
        HttpClientModule,
        ComponentsModule,
    ]
})
export class LoginModule { }
