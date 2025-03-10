import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../../components/components.module';
import { UserFormComponent } from './form/user-form.component';
import { UserListComponent } from './list/user-list.component';
import { UserRoutes } from './user.routes';

@NgModule({
    declarations: [
        UserFormComponent,
        UserListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        UserRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class UserModule { }
