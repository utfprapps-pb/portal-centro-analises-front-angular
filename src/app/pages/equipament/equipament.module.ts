import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { EquipamentRoutes } from './equipament.routes';
import { EquipamentFormComponent } from './form/equipament-form.component';
import { EquipamentListComponent } from './list/equipament-list.component';



@NgModule({
    declarations: [
        EquipamentFormComponent,
        EquipamentListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        EquipamentRoutes,
    ]
})
export class EquipamentModule { }
