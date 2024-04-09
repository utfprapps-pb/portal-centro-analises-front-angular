import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { ProfileFormComponent } from './form/profile-form.component';
import { ProfileRoutes } from './profile.routes';



@NgModule({
    declarations: [
        ProfileFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        ProfileRoutes,
    ]
})
export class ProfileModule { }
