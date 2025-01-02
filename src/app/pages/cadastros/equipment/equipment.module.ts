import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../../components/components.module';
import { EquipmentRoutes } from './equipment.routes';
import { EquipmentFormComponent } from './form/equipment-form.component';
import { EquipmentListComponent } from './list/equipment-list.component';



@NgModule({
    declarations: [
        EquipmentFormComponent,
        EquipmentListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        EquipmentRoutes,
    ]
})
export class EquipmentModule { }
