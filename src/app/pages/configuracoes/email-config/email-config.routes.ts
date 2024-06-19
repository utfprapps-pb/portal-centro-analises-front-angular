import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailConfigFormComponent } from './form/email-config-form.component';

const routes: Routes = [
    { path: '', component: EmailConfigFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmailConfigRoutes { }
