import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';



@NgModule({
    declarations: [
        InputTextComponent,
        InputPasswordComponent,
    ],
    exports: [
        InputTextComponent,
        InputPasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule,
    ],
})
export class ComponentsModule { }
