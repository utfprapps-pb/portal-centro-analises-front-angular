import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { TermsOfUseFormComponent } from './form/termsofuse-form.component';
import { TermsOfUseListComponent } from './list/termsofuse-list.component';
import { TermsOfUseRoutes } from './termsofuse.routes';


@NgModule({
    declarations: [
        TermsOfUseFormComponent,
        TermsOfUseListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        TermsOfUseRoutes
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class TermsOfUseModule { }
