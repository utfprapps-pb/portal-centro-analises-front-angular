import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';

import { CompCtrlDirective } from '../core/directives/compctrl/compctrl.directive';
import { QuillReaderDirective } from '../core/directives/quillreader/quillreader.directive';
import { CurrencyFormatterPipe } from '../core/pipes/currency-formatter.pipe';
import { DateFormatterPipe } from '../core/pipes/date-formatter.pipe';
import { ToastrService } from '../core/services/toastr.service';
import { ToasterService } from '../core/toaster/toaster.service';
import { UtilsModule } from '../utils/utils.module';
import { CheckBoxComponent } from './checkbox/checkbox.component';
import { ComboboxComponent } from './combobox/combobox.component';
import {
    BooleanColumnTemplateComponent,
} from './datatable/datatable-columns/boolean-column-template/boolean-column-template.component';
import { ColumnTemplateComponent } from './datatable/datatable-columns/column-template/column-template.component';
import {
    CurrencyColumnTemplateComponent,
} from './datatable/datatable-columns/currency-column-template/currency-column-template.component';
import {
    DateColumnTemplateComponent,
} from './datatable/datatable-columns/date-column-template/date-column-template.component';
import {
    EnumColumnTemplateComponent,
} from './datatable/datatable-columns/enum-column-template/enum-column-template.component';
import {
    BooleanFilterTemplateComponent,
} from './datatable/datatable-filters/boolean-filter-template/boolean-filter-template.component';
import {
    CurrencyFilterTemplateComponent,
} from './datatable/datatable-filters/currency-filter-template/currency-filter-template.component';
import {
    DateFilterTemplateComponent,
} from './datatable/datatable-filters/date-filter-template/date-filter-template.component';
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
import { InputQuillComponent } from './inputs/input-quill/input-quill.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InputTextAreaComponent } from './inputs/input-textarea/input-textarea.component';
import { InvalidInfoComponent } from './invalid-info/invalid-info.component';
import { ModalComponent } from './modal/modal.component';
import { PeriodicTableElementComponent } from './periodic-table/periodic-table-element/periodic-table-element.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { RadioButtonComponent } from './radiobutton/radiobutton.component';
import { EnumTemplateComponent } from './templates/enum-template/enum-template.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FormReportComponent } from './form-report/form-report.component';

@NgModule({
    declarations: [
        DateFormatterPipe,
        CurrencyFormatterPipe,

        CompCtrlDirective,
        QuillReaderDirective,

        HeaderComponent,
        ChangePasswordComponent,
        FormBaseComponent,
        FormCrudComponent,
        FormReportComponent,
        FormListComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputTextAreaComponent,
        CheckBoxComponent,
        InputPasswordComponent,
        InputEmailComponent,
        ComboboxComponent,
        RadioButtonComponent,
        InputMaskComponent,
        InputNumber,
        InputCurrency,
        DatePicker,
        UploadfileComponent,
        InputQuillComponent,
        ModalComponent,

        EnumTemplateComponent,

        PeriodicTableComponent,
        PeriodicTableElementComponent,

        DatatableComponent,
        DatatableHeaderButtonComponent,

        ColumnTemplateComponent,
        EnumColumnTemplateComponent,
        BooleanColumnTemplateComponent,
        DateColumnTemplateComponent,
        CurrencyColumnTemplateComponent,

        NumberFilterTemplateComponent,
        CurrencyFilterTemplateComponent,
        TextFilterTemplateComponent,
        EnumFilterTemplateComponent,
        BooleanFilterTemplateComponent,
        DateFilterTemplateComponent,
    ],
    exports: [
        DateFormatterPipe,
        CurrencyFormatterPipe,

        CompCtrlDirective,
        QuillReaderDirective,

        HeaderComponent,
        ChangePasswordComponent,
        FormBaseComponent,
        FormCrudComponent,
        FormReportComponent,
        FormListComponent,
        InvalidInfoComponent,
        InputTextComponent,
        InputTextAreaComponent,
        CheckBoxComponent,
        InputMaskModule,
        InputPasswordComponent,
        InputEmailComponent,
        ComboboxComponent,
        RadioButtonComponent,
        InputMaskComponent,
        InputNumber,
        InputCurrency,
        DatePicker,
        UploadfileComponent,
        InputQuillComponent,
        ModalComponent,

        EnumTemplateComponent,

        PeriodicTableComponent,
        PeriodicTableElementComponent,

        DatatableComponent,
        DatatableHeaderButtonComponent,

        ColumnTemplateComponent,
        EnumColumnTemplateComponent,
        BooleanColumnTemplateComponent,
        DateColumnTemplateComponent,
        CurrencyColumnTemplateComponent,

        NumberFilterTemplateComponent,
        CurrencyFilterTemplateComponent,
        TextFilterTemplateComponent,
        EnumFilterTemplateComponent,
        BooleanFilterTemplateComponent,
        DateFilterTemplateComponent,
        StepperModule,
        TableModule,
        NgxTooltip,
        TimelineModule,
        AccordionModule,
        TabViewModule,
        TieredMenuModule,
        DialogModule,
        ProgressSpinnerModule,
        TagModule,
        CheckboxModule,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
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
        CheckboxModule,
        CalendarModule,
        DialogModule,
        StepperModule,
        NgxTooltip,
        FileUploadModule,
        TimelineModule,
        EditorModule,
        AccordionModule,
        TabViewModule,
    ],
    providers: [
        ToastrService,
        ToasterService,
    ]
})
export class ComponentsModule { }
