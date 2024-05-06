import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';

import { ToastrService } from '../core/services/toastr.service';
import { ToasterService } from '../core/toaster/toaster.service';
import { UtilsModule } from '../utils/utils.module';
import { ComboboxComponent } from './combobox/combobox.component';
import { CompCtrlDirective } from './compctrl/compctrl.directive';
import { ColumnTemplateComponent } from './datatable/datatable-columns/column-template/column-template.component';
import {
    EnumColumnTemplateComponent,
} from './datatable/datatable-columns/enum-column-template/enum-column-template.component';
import {
    EnumFilterTemplateComponent,
} from './datatable/datatable-filters/enum-filter-template/enum-filter-template.component';
import {
    NumberFilterTemplateComponent,
} from './datatable/datatable-filters/number-filter-template/number-filter-template.component';
import {
    TextFilterTemplateComponent,
} from './datatable/datatable-filters/text-filter-template/text-filter-template.component';
import { DatatableHeaderButtonComponent } from './datatable/datatable-header-button/datatable-header-button.component';
import { DatatableComponent } from './datatable/datatable/datatable.component';
import { FormBaseComponent } from './form-base/form-base.component';
import { FormCrudComponent } from './form-crud/form-crud.component';
import { FormListComponent } from './form-list/form-list.component';
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
        FormListComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputPasswordComponent,
        InputEmailComponent,
        ComboboxComponent,
        InputNumber,
        InputCurrency,
        DatatableComponent,
        DatatableHeaderButtonComponent,
        EnumColumnTemplateComponent,
        ColumnTemplateComponent,
        NumberFilterTemplateComponent,
        TextFilterTemplateComponent,
        EnumFilterTemplateComponent,
    ],
    exports: [
        CompCtrlDirective,
        HeaderComponent,
        FormBaseComponent,
        FormCrudComponent,
        FormListComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputPasswordComponent,
        InputEmailComponent,
        ComboboxComponent,
        InputNumber,
        InputCurrency,
        TableModule,
        DatatableHeaderButtonComponent,
        DatatableComponent,
        EnumColumnTemplateComponent,
        ColumnTemplateComponent,
        NumberFilterTemplateComponent,
        TextFilterTemplateComponent,
        EnumFilterTemplateComponent,
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
        TableModule,
        TagModule,
        DropdownModule,
    ],
    providers: [
        ToastrService,
        ToasterService,
    ]
})
export class ComponentsModule { }
