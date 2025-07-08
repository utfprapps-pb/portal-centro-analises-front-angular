import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { FinanceiroRoutes } from './financeiro.routes';
import { FinanceiroFormComponent } from './form/financeiro-form.component';
import { FinanceiroListComponent } from './list/financeiro-list.component';


@NgModule({
    declarations: [
        FinanceiroFormComponent,
        FinanceiroListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        FinanceiroRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class FinanceiroModule { }
