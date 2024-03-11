import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from './../../components/components.module';
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
        ComponentsModule
    ]
})
export class LoginModule { }
