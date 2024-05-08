import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { PartnerFormComponent } from './form/partner-form.component';
import { PartnerListComponent } from './list/partner-list.component';
import { PartnerRoutes } from './partner.routes';



@NgModule({
    declarations: [
        PartnerFormComponent,
        PartnerListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        PartnerRoutes,
    ]
})
export class PartnerModule { }
