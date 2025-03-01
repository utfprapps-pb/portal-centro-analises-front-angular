import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../../components/components.module';
import { DomainRoutes } from './domain.routes';
import { DomainFormComponent } from './form/domain-form.component';
import { DomainListComponent } from './list/domain-list.component';

@NgModule({
    declarations: [
        DomainFormComponent,
        DomainListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        DomainRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class DomainModule { }
