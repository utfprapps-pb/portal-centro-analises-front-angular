import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeFormComponent } from './form/home-form.component';

const routes: Routes = [
    {
        path: '',
        component: HomeFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutes { }
