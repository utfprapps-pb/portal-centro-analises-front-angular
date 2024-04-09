import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';

import { ToastrService } from '../core/services/toastr.service';
import { ToasterService } from '../core/toaster/toaster.service';
import { UtilsModule } from '../utils/utils.module';
import { CompCtrlDirective } from './compctrl/compctrl.directive';
import { FormBaseComponent } from './form-base/form-base.component';
import { FormCrudComponent } from './form-crud/form-crud.component';
import { HeaderComponent } from './header/header.component';
import { InputCurrency } from './inputs/input-currency/input-currency.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputNumber } from './inputs/input-number/input-number.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InvalidInfoComponent } from './inputs/invalid-info/invalid-info.component';


@NgModule({
    declarations: [
        CompCtrlDirective,
        HeaderComponent,
        FormBaseComponent,
        FormCrudComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputPasswordComponent,
        InputEmailComponent,
        InputNumber,
        InputCurrency,
    ],
    exports: [
        CompCtrlDirective,
        HeaderComponent,
        FormBaseComponent,
        FormCrudComponent,
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
        MenubarModule,
        TieredMenuModule,
        BreadcrumbModule,
        TooltipModule,
    ],
    providers: [
        ToastrService,
        ToasterService,
    ]
})
export class ComponentsModule { }
