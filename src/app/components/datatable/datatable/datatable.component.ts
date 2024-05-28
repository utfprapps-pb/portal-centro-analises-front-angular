import { AfterViewInit, Component, Injector, Input, ViewChild } from '@angular/core';
import { TableState } from 'primeng/api';
import { Table } from 'primeng/table';

import { ToastrService } from '../../../core/services/toastr.service';
import { ToasterService } from '../../../core/toaster/toaster.service';
import { GenericCrudService } from '../../../generics/generic-crud.service';
import { ZModel } from '../../../generics/zmodel';
import { ObjectUtils } from '../../../utils/object-utils';
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

    private filterColumnsComponent: FilterTemplateComponent[] = [];
    public addFilterColumn(template: FilterTemplateComponent): void {
        if (!!this.name) {
            template.loadState();
        }
        this.filterColumnsComponent.push(template);
    }

    private dialogService: DialogService;
    private toasterService: ToasterService;
    private toastrService: ToastrService;
    constructor(
        protected readonly injector: Injector
    ) {
        this.dialogService = injector.get(DialogService);
        this.toasterService = injector.get(ToasterService);
        this.toastrService = injector.get(ToastrService);
    }

    public ngAfterViewInit(): void {
        if (!!this.name) {
            this.table.stateKey = this.name;
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
            const filter: DatatableFilterColumn = this.generateDatatableFilter(prop);
            if (!!filter) {
                this.addDatatableFilter(filter);
            }

            const column: DatatableColumn = this.generateDatatableColumn(prop);
            if (!!column) {
                this.addDatatableColumn(column);
            }
        }
        await this.loadDatatableData();
        this.loading = false;
    }

    private generateDatatableColumn(prop: string): DatatableColumn {
        const hidden = Reflect.getMetadata('column:hidden', this.emptyObject, prop) || false;
        if (hidden) {
            return null;
        }

        let prp = prop as string;
        if (prp == 'id') {
            prp = 'Código';
        }
        prp = prp.charAt(0).toUpperCase() + prp.substring(1);

        const column = new DatatableColumn();
        const titulo = Reflect.getMetadata('column:title', this.emptyObject, prop) || prp;
        column.header = titulo;
        column.headerAlign = Reflect.getMetadata('column:title-align', this.emptyObject, prop);
        column.field = prop;
        column.type = Reflect.getMetadata('primitive', this.emptyObject, prop);
        column.mask = Reflect.getMetadata('column:mask', this.emptyObject, prop);
        column.align = Reflect.getMetadata('column:align', this.emptyObject, prop);

        if (column.type == 'boolean') {
            column.align = 'center';
            column.enumname = 'Boolean';
        }
        if (column.type == 'enum') {
            column.align = 'center';
            column.width = '200px'
            column.enumname = Reflect.getMetadata('enumname', this.emptyObject, prop);
        }
        if (column.type == 'numeric') {
            column.width = '150px'
        }
        if (column.type == 'date') {
            column.align = 'center';
        }
        const minWidth = Reflect.getMetadata('column:minWidth', this.emptyObject, prop);
        if (!!minWidth) {
            column.minWidth = minWidth;
        }
        const maxWidth = Reflect.getMetadata('column:maxWidth', this.emptyObject, prop);
        if (!!maxWidth) {
            column.maxWidth = maxWidth;
        }
        return column;
    }

    private generateDatatableFilter(prop: string): DatatableFilterColumn {
        const hidden = Reflect.getMetadata('column:hidden', this.emptyObject, prop) || false;
        if (hidden) {
            return null;
        }
        let prp = prop as string;
        if (prp == 'id') {
            prp = 'Código';
        }
        prp = prp.charAt(0).toUpperCase() + prp.substring(1);

        const filter = new DatatableFilterColumn();
        filter.field = prop;
        filter.type = Reflect.getMetadata('primitive', this.emptyObject, prop);
        filter.mask = Reflect.getMetadata('column:mask', this.emptyObject, prop);
        if (filter.type == 'enum') {
            filter.enumname = Reflect.getMetadata('enumname', this.emptyObject, prop);
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
        const mapFieldType: Map<String, String> = new Map();
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

}
