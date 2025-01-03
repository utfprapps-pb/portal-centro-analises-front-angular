import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { ComponentsModule } from '../../components/components.module';
import { SolicitarFormComponent } from './form/solicitar-form.component';
import { SolicitarRoutes } from './solicitar.routes';

@NgModule({
    declarations: [
        SolicitarFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        SolicitarRoutes,
        NgxJsonViewerModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class SolicitarModule { }
