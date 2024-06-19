import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipamentFormComponent } from './form/equipament-form.component';
import { EquipamentListComponent } from './list/equipament-list.component';

const routes: Routes = [
    {
        path: '', component: EquipamentListComponent,
    },
    {
        path: ':action',
        component: EquipamentFormComponent,
    },
    {
        path: ':action/:id',
        component: EquipamentFormComponent,
    },
    {
        path: ':action/:event/:id',
        component: EquipamentFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EquipamentRoutes { }
