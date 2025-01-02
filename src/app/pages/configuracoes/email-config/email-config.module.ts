import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../../components/components.module';
import { EmailConfigRoutes } from './email-config.routes';
import { EmailConfigFormComponent } from './form/email-config-form.component';

@NgModule({
    declarations: [
        EmailConfigFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        EmailConfigRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class EmailConfigModule { }
