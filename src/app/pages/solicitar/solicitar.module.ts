import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { ComponentsModule } from '../../components/components.module';
import { SolicitarFormComponent } from './form/solicitar-form.component';
import {
    SolicitarFormularioTemplateComponent,
} from './solicitar-formulario-template/solicitar-formulario-template.component';
import { SolicitarRoutes } from './solicitar.routes';

@NgModule({
    declarations: [
        SolicitarFormComponent,
        SolicitarFormularioTemplateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        SolicitarRoutes,
        NgxJsonViewerModule,
    ],
    exports: [
        SolicitarFormularioTemplateComponent
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class SolicitarModule { }
