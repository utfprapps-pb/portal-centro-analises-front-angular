import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UtilsModule } from '../utils/utils.module';
import { CompCtrlDirective } from './compctrl/compctrl.directive';
import { FormBaseComponent } from './form-base/form-base.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InvalidInfoComponent } from './inputs/invalid-info/invalid-info.component';


@NgModule({
    declarations: [
        CompCtrlDirective,
        FormBaseComponent,
        InputTextComponent,
        InputPasswordComponent,
        InvalidInfoComponent,
    ],
    exports: [
        CompCtrlDirective,
        FormBaseComponent,
        InputTextComponent,
        InputPasswordComponent,
        InvalidInfoComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule,
        UtilsModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
    ],
})
export class ComponentsModule { }
