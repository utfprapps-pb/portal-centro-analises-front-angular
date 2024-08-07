import { AfterViewInit, Component, Injector, Input, ViewChild } from '@angular/core';
import { TableState } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { GenericCrudService } from '../../../generics/generic-crud.service';
import { ZModel } from '../../../generics/zmodel';
import { ObjectUtils } from '../../../utils/object-utils';
import { ColumnTemplateComponent } from '../datatable-columns/column-template/column-template.component';
import { DatatableColumn } from '../datatable-columns/datatable-column';
import { DatatableFilterColumn } from '../datatable-columns/datatable-filter-column';
import { FilterTemplateComponent } from '../datatable-filters/datatable-filter-template.component';
import { Dialog, DialogService, DialogType } from './../../../core/services/dialog.service';
import { DatatableOptions } from './datatable-options';

@Component({
    selector: 'datatable',
    templateUrl: './datatable.component.html',
    styleUrl: './datatable.component.scss'
})
export class DatatableComponent implements AfterViewInit {

    public options: DatatableOptions = new DatatableOptions();
    public readonly rowsPerPageOptions: number[] = [10, 25, 50];

    public loading: boolean = false;

    @ViewChild('table') table: Table;

    private _service: GenericCrudService<any>;
    @Input('service') set service(service: GenericCrudService<any>) {
        this._service = service;
        this.emptyObject = this._service.createInstance();

        this.createDatatableHeader();
    }

    @Input('name') name: string;
    @Input('allowSelectAll') allowSelectAll: boolean = false;
    @Input('showEditButton') showEditButton: boolean = true;
    @Input('showDeleteButton') showDeleteButton: boolean = true;
    @Input() allowSelectRow: Function;
    @Input() allowDeleteRow: Function;

    private emptyObject: any;
    public datatableSelectedObjects: any[] = [];

    public datatableObjects: any[] = [];
    public datatableColumns: DatatableColumn[] = [];
    public datatableFilterColumns: DatatableFilterColumn[] = [];

    private _columnsBefore: ColumnTemplateComponent[] = [];
    private _columnsAfter: ColumnTemplateComponent[] = [];

    get columnsBefore() {
        return this._columnsBefore.filter(it => it.visible);
    }
    get columnsAfter() {
        return this._columnsAfter.filter(it => it.visible);
    }

    private filterColumnsComponent: FilterTemplateComponent[] = [];
    public addFilterColumn(template: FilterTemplateComponent): void {
        if (!!this.name) {
            template.loadState();
        }
        this.filterColumnsComponent.push(template);
    }

    private dialogService: DialogService;
    private toastrService: ToastrService;
    constructor(
        protected readonly injector: Injector
    ) {
        this.dialogService = injector.get(DialogService);
        this.toastrService = injector.get(ToastrService);
    }

    public ngAfterViewInit(): void {
        if (!!this.name) {
            this.table.stateKey = `${this.name}_${AuthService.USER_LOGGED.id}`;
            this.table.stateStorage = 'local';
            const state = localStorage.getItem(this.table.stateKey);
            if (ObjectUtils.isNotEmpty(state)) {
                const stateObject: TableState = JSON.parse(state);
                this.table.rows = stateObject.rows || this.rowsPerPageOptions[0];
            }
        }
        this.table.rowSelectable = this.allowSelectRowDatatableInternal.bind(this);
    }

    public async saveState(): Promise<void> {
        if (!!this.name && !!this.table) {
            this.table.saveState();
        }
    }

    public async clearState(): Promise<void> {
        this.table.clear();
        if (!!this.name && !!this.table) {
            this.table.clearState();
            this.table.rows = this.rowsPerPageOptions[0];
        }
    }

    private async createDatatableHeader(): Promise<void> {
        this.loading = true;
        this.datatableColumns = [];
        for (const prop in this.emptyObject) {
            if (!Reflect.getMetadata('column:title', this.emptyObject, prop) || false) continue;

            const additionalcolumn: string[] = Reflect.getMetadata('column:additionalcolumn', this.emptyObject, prop);
            if (ObjectUtils.isNotEmpty(additionalcolumn)) {
                for (const col of additionalcolumn) {
                    if (!Reflect.getMetadata('column:title', this.emptyObject[prop], col) || false) continue;

                    const filter: DatatableFilterColumn = this.generateDatatableFilter(col, prop);
                    if (!!filter) {
                        this.addDatatableFilter(filter);
                    }

                    const column: DatatableColumn = this.generateDatatableColumn(col, prop);
                    if (!!column) {
                        this.addDatatableColumn(column);
                    }
                }
                continue;
            } else {
                const filter: DatatableFilterColumn = this.generateDatatableFilter(prop);
                if (!!filter) {
                    this.addDatatableFilter(filter);
                }

                const column: DatatableColumn = this.generateDatatableColumn(prop);
                if (!!column) {
                    this.addDatatableColumn(column);
                }
            }
        }
        await this.loadDatatableData();
        this.loading = false;
    }

    public getColumnData(data: any, field: string): String | number {
        if (field != null && field.includes('.')) {
            let path: string[] = field.split('.');
            const fieldPath = path.shift();
            return this.getColumnData(data[fieldPath], path.join('.'));
        } else {
            return data[field];
        }
    }

    private generateDatatableColumn(prop: string, parent?: string): DatatableColumn {
        const data = parent == null ? this.emptyObject : this.emptyObject[parent];
        const hidden = Reflect.getMetadata('column:hidden', data, prop) || false;
        if (hidden || (!!parent && !!Reflect.getMetadata('column:hidden', this.emptyObject, parent))) {
            return null;
        }

        let title = prop as string;
        if (title == 'id') {
            title = 'Código';
        }
        title = title.charAt(0).toUpperCase() + title.substring(1);

        const reflectionTitle: string = Reflect.getMetadata('column:title', data, prop);
        if (ObjectUtils.isNotEmpty(reflectionTitle)) {
            title = reflectionTitle;
        }
        if (!!parent) {
            const reflectionParentTitle: string = Reflect.getMetadata('column:title', this.emptyObject, parent);
            if (!!reflectionParentTitle) {
                title = `${reflectionParentTitle} | ${title}`
            }
        }

        const column = new DatatableColumn();
        column.header = title;
        column.headerAlign = Reflect.getMetadata('column:title-align', data, prop);
        column.field = `${parent != null ? (parent + '.') : ''}${prop}`;
        column.type = Reflect.getMetadata('primitive', data, prop);
        column.mask = Reflect.getMetadata('column:mask', data, prop);
        column.align = Reflect.getMetadata('column:align', data, prop);

        if (column.type == 'boolean') {
            column.align = 'center';
            column.enumname = 'Boolean';
        }
        if (column.type == 'enum') {
            column.align = 'center';
            column.width = '200px'
            column.enumname = Reflect.getMetadata('enumname', data, prop);
        }
        if (column.type == 'numeric') {
            column.width = '150px'
        }
        if (column.type == 'date') {
            column.align = 'center';
        }
        const minWidth = Reflect.getMetadata('column:minWidth', data, prop);
        if (!!minWidth) {
            column.minWidth = minWidth;
        }
        const maxWidth = Reflect.getMetadata('column:maxWidth', data, prop);
        if (!!maxWidth) {
            column.maxWidth = maxWidth;
        }
        return column;
    }

    private generateDatatableFilter(prop: string, parent?: string): DatatableFilterColumn {
        const data = parent == null ? this.emptyObject : this.emptyObject[parent];
        const hidden = Reflect.getMetadata('column:hidden', data, prop) || false;
        if (hidden || (!!parent && !!Reflect.getMetadata('column:hidden', this.emptyObject, parent))) {
            return null;
        }

        const filter = new DatatableFilterColumn();
        filter.field = `${parent != null ? (parent + '.') : ''}${prop}`;
        filter.type = Reflect.getMetadata('primitive', data, prop);
        filter.mask = Reflect.getMetadata('column:mask', data, prop);
        if (filter.type == 'enum') {
            filter.enumname = Reflect.getMetadata('enumname', data, prop);
        }
        if (filter.type == 'boolean') {
            filter.enumname = 'Boolean';
        }
        return filter;
    }

    public async addDatatableColumn(column: DatatableColumn): Promise<void> {
        this.datatableColumns.push(column);
    }

    public async addDatatableFilter(filter: DatatableFilterColumn): Promise<void> {
        this.datatableFilterColumns.push(filter);
    }

    private async loadDatatableData(): Promise<void> {
        await this._service.findAll().then((data: any[]) => {
            for (const prop in this.emptyObject) {
                const type = Reflect.getMetadata('primitive', this.emptyObject, prop);
                if (type == 'boolean') {
                    data.forEach(it => it[prop] = !!it[prop]);
                }
            }
            this.datatableObjects = data.sort((a, b) => a.id > b.id ? -1 : 1);
        });
    }

    public async onClickClearFilter(): Promise<void> {
        this.filterColumnsComponent.forEach(filter => filter.clearValue());
        await this.clearState();
        await this.onClickRefresh();
    }

    public async onClickToggleFilter(): Promise<void> {
        this.options.showfilter = !this.options.showfilter;
        if (!this.options.showfilter) {
            this.onClickClearFilter();
        }
    }

    public async onClickRefresh(): Promise<void> {
        this.loading = true;
        await this.loadDatatableData();
        this.loading = false;
    }

    public allowSelectRowDatatableInternal(data: any): boolean {
        if (!!this.allowSelectRow) {
            return this.allowSelectRow(!!data.data ? data.data : data);
        }
        return true;
    }

    public allowDeleteRowDatatableInternal(data: any): boolean {
        if (!!this.allowDeleteRow) {
            return this.allowDeleteRow(!!data.data ? data.data : data);
        }
        return true;
    }

    public currentPageReportTemplate(): string {
        const text: string[] = [];
        if (this.datatableSelectedObjects.length > 0) {
            text.push(`${this.datatableSelectedObjects.length} Registros selecionados`)
        }
        text.push('Vendo de {first} até {last} de {totalRecords} registros.');
        return text.join(' | ');
    }

    public getHref(data: ZModel): string {
        return `#${this._service?.path}/alterar/${data.id}`;
    }

    public async onClickDelete(data: ZModel): Promise<void> {
        if (this.allowDeleteRowDatatableInternal(data)) {
            const dialog: Dialog = new Dialog();
            dialog.type = DialogType.QUESTION;
            dialog.title = "Você tem certeza que deseja excluir este registro?"
            dialog.html = `<b class="text-danger">A operação não pode ser desfeita!</b>`

            await this.dialogService.open(dialog).then(async (canDelete) => {
                if (canDelete) {
                    this.loading = true;
                    await this._service.delete(data.id).then(async () => {
                        this.toastrService.showSuccess(this.getPageTitle(), 'Registro excluído com sucesso!');
                        await this.onClickRefresh();
                    }, error => {
                        if (this.hasErrorMapped(error)) {
                            this.errorHandler(error);
                        } else {
                            this.toastrService.showError(this.getPageTitle(), 'Erro ao excluir Registro!');
                        }
                    }).finally(() => this.loading = false);
                }
            })
        }
    }

    private getPageTitle(): string {
        const title = document.title;
        if (title.includes('|')) {
            return title.substring(title.indexOf('|' + 1));
        }
        return title;
    }

    private hasErrorMapped(error: any): boolean {
        return ObjectUtils.isNotEmpty(error) &&
            ((ObjectUtils.isNotEmpty(error.error) && !!error.error.mapped) ||
                (!!error.mapped));
    }

    private errorHandler(error: any, title?: string): void {
        if (!this.hasErrorMapped(error)) {
            return;
        } else {
            if (ObjectUtils.isEmpty(title)) {
                title = this.getPageTitle();
            }

            let message: string = '';
            let errosCompCtrl: any = null;
            if ((ObjectUtils.isNotEmpty(error.error) && !!error.error.mapped)) {
                message = error.error.message;
                errosCompCtrl = error.error.erros;
            } else {
                message = error.message;
                errosCompCtrl = error.errors;
            }

            if (ObjectUtils.isNotEmpty(message)) {
                this.toastrService.showError(title, message);
            } else {
                console.error('Erro não mapeado:', error);
            }
        }
    }

    public addCustomColumnTemplate(column: ColumnTemplateComponent): void {
        const templateColumn = column.position === 'before' ? this._columnsBefore : this._columnsAfter;
        if (column.order == null) {
            templateColumn.push(column);
        } else {
            templateColumn.splice(column.order, 0, column);
        }
    }

}
