import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
        HttpClientModule,
        SolicitarRoutes,
    ]
})
export class SolicitarModule { }
