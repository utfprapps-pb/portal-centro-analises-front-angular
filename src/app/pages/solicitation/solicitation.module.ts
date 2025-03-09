import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { ComponentsModule } from '../../components/components.module';
import { SolicitationFormComponent } from './form/solicitation-form.component';
import { SolicitationListComponent } from './list/solicitation-list.component';
import { SolicitationRoutes } from './solicitation.routes';

@NgModule({
    declarations: [
        SolicitationFormComponent,
        SolicitationListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        SolicitationRoutes,

        CardModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class SolicitationModule { }
