import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipmentFormComponent } from './form/equipment-form.component';
import { EquipmentListComponent } from './list/equipment-list.component';

const routes: Routes = [
    {
        path: '', component: EquipmentListComponent,
    },
    {
        path: ':action',
        component: EquipmentFormComponent,
    },
    {
        path: ':action/:id',
        component: EquipmentFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: EquipmentFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EquipmentRoutes { }
