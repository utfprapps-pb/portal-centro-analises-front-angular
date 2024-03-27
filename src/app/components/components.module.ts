import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UtilsModule } from '../utils/utils.module';
import { CompCtrlDirective } from './compctrl/compctrl.directive';
import { FormBaseComponent } from './form-base/form-base.component';
import { InputCurrency } from './inputs/input-currency/input-currency.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputNumber } from './inputs/input-number/input-number.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InvalidInfoComponent } from './inputs/invalid-info/invalid-info.component';
import { ToasterService } from './toaster/toaster.service';
import { ToastrService } from './toastr.service';


@NgModule({
    declarations: [
        CompCtrlDirective,
        FormBaseComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputPasswordComponent,
        InputEmailComponent,
        InputNumber,
        InputCurrency,
    ],
    exports: [
        CompCtrlDirective,
        FormBaseComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputPasswordComponent,
        InputEmailComponent,
        InputNumber,
        InputCurrency,
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
        InputNumberModule,
    ],
    providers: [
        ToastrService,
        ToasterService,
    ]
})
export class ComponentsModule { }
