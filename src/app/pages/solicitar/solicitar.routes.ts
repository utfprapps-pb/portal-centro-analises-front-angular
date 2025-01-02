import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitarFormComponent } from './form/solicitar-form.component';

const routes: Routes = [
    {
        path: '',
        component: SolicitarFormComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SolicitarRoutes { }
