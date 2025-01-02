import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
        ComponentsModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class LoginModule { }
