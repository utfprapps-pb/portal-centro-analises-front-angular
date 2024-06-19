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

import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CurrencyFormatterPipe } from '../core/pipes/currency-formatter.pipe';
import { DateFormatterPipe } from '../core/pipes/date-formatter.pipe';
import { ToastrService } from '../core/services/toastr.service';
import { ToasterService } from '../core/toaster/toaster.service';
import { UtilsModule } from '../utils/utils.module';
import { ComboboxComponent } from './combobox/combobox.component';
import { CompCtrlDirective } from './compctrl/compctrl.directive';
import { BooleanColumnTemplateComponent } from './datatable/datatable-columns/boolean-column-template/boolean-column-template.component';
import { ColumnTemplateComponent } from './datatable/datatable-columns/column-template/column-template.component';
import { CurrencyColumnTemplateComponent } from './datatable/datatable-columns/currency-column-template/currency-column-template.component';
import { DateColumnTemplateComponent } from './datatable/datatable-columns/date-column-template/date-column-template.component';
import {
    EnumColumnTemplateComponent,
} from './datatable/datatable-columns/enum-column-template/enum-column-template.component';
import { BooleanFilterTemplateComponent } from './datatable/datatable-filters/boolean-filter-template/boolean-filter-template.component';
import { DateFilterTemplateComponent } from './datatable/datatable-filters/date-filter-template/date-filter-template.component';
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
import { DatePicker } from './datepicker/datepicker.component';
import { FormBaseComponent } from './form-base/form-base.component';
import { FormCrudComponent } from './form-crud/form-crud.component';
import { FormListComponent } from './form-list/form-list.component';
import { ChangePasswordComponent } from './header/change-password/change-password.component';
import { HeaderComponent } from './header/header.component';
import { InputCurrency } from './inputs/input-currency/input-currency.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputMaskComponent } from './inputs/input-mask/input-mask.component';
import { InputNumber } from './inputs/input-number/input-number.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InvalidInfoComponent } from './inputs/invalid-info/invalid-info.component';
import { RadioButtonComponent } from './radiobutton/radiobutton.component';

@NgModule({
    declarations: [
        DateFormatterPipe,
        CurrencyFormatterPipe,

        CompCtrlDirective,
        HeaderComponent,
        ChangePasswordComponent,
        FormBaseComponent,
        FormCrudComponent,
        FormListComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputPasswordComponent,
        InputEmailComponent,
        ComboboxComponent,
        RadioButtonComponent,
        InputMaskComponent,
        InputNumber,
        InputCurrency,
        DatePicker,

        DatatableComponent,
        DatatableHeaderButtonComponent,

        ColumnTemplateComponent,
        EnumColumnTemplateComponent,
        BooleanColumnTemplateComponent,
        DateColumnTemplateComponent,
        CurrencyColumnTemplateComponent,

        NumberFilterTemplateComponent,
        TextFilterTemplateComponent,
        EnumFilterTemplateComponent,
        BooleanFilterTemplateComponent,
        DateFilterTemplateComponent,
    ],
    exports: [
        DateFormatterPipe,
        CurrencyFormatterPipe,

        CompCtrlDirective,
        HeaderComponent,
        ChangePasswordComponent,
        FormBaseComponent,
        FormCrudComponent,
        FormListComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputMaskModule,
        InputPasswordComponent,
        InputEmailComponent,
        ComboboxComponent,
        RadioButtonComponent,
        InputMaskComponent,
        InputNumber,
        InputCurrency,
        DatePicker,
        TableModule,

        DatatableComponent,
        DatatableHeaderButtonComponent,

        ColumnTemplateComponent,
        EnumColumnTemplateComponent,
        BooleanColumnTemplateComponent,
        DateColumnTemplateComponent,
        CurrencyColumnTemplateComponent,

        NumberFilterTemplateComponent,
        TextFilterTemplateComponent,
        EnumFilterTemplateComponent,
        BooleanFilterTemplateComponent,
        DateFilterTemplateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        InputMaskModule,
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
        RadioButtonModule,
        CalendarModule,
        DialogModule
    ],
    providers: [
        ToastrService,
        ToasterService,
    ]
})
export class ComponentsModule { }
