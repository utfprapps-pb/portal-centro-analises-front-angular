import { Component, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { GenericCrudService } from '../../../generics/generic-crud.service';
import { DatatableColumn } from '../datatable-columns/datatable-column';
import { DatatableFilterColumn } from '../datatable-columns/datatable-filter-column';

@Component({
    selector: 'datatable',
    templateUrl: './datatable.component.html',
    styleUrl: './datatable.component.scss'
})
export class DatatableComponent {

    @ViewChild('table') table: Table;
    @Input('service') set service(service: GenericCrudService<any>) {
        this._service = service;
        this.emptyObject = this._service.createInstance();

        this.createDatatableHeader();
    }
    private _service: GenericCrudService<any>;

    private emptyObject: any;

    public datatableObjects: any[] = [];
    public datatableColumns: DatatableColumn[] = [];
    public datatableFilterColumns: DatatableFilterColumn[] = [];

    public first = 0;
    public rows = 10;

    public isLastPage(): boolean {
        return this.datatableObjects ? this.first === this.datatableObjects.length - this.rows : true;
    }

    public isFirstPage(): boolean {
        return this.datatableObjects ? this.first === 0 : true;
    }

    private async createDatatableHeader(): Promise<void> {
        this.datatableColumns = [];
        for (const prop in this.emptyObject) {
            const filter: DatatableFilterColumn = this.generateDatatableFilter(prop);
            this.addDatatableFilter(filter);

            const column: DatatableColumn = this.generateDatatableColumn(prop);
            this.addDatatableColumn(column);
        }
        this.loadDatatableData();
    }

    private generateDatatableColumn(prop: string): DatatableColumn {
        let prp = prop as string;
        if (prp == 'id') {
            prp = 'Código';
        }
        prp = prp.charAt(0).toUpperCase() + prp.substring(1);

        const column = new DatatableColumn();
        column.header = prp;
        column.field = prop;
        column.type = Reflect.getMetadata('design:type', this.emptyObject, prop);
        if (column.type == 'enum') {
            column.enumname = Reflect.getMetadata('enumname', this.emptyObject, prop);
        }
        return column;
    }

    private generateDatatableFilter(prop: string): DatatableFilterColumn {
        let prp = prop as string;
        if (prp == 'id') {
            prp = 'Código';
        }
        prp = prp.charAt(0).toUpperCase() + prp.substring(1);

        const column = new DatatableFilterColumn();
        column.field = prop;
        column.type = Reflect.getMetadata('primitive', this.emptyObject, prop);
        if (column.type == 'enum') {
            column.enumname = Reflect.getMetadata('enumname', this.emptyObject, prop);
        }
        return column;
    }

    public async addDatatableColumn(column: DatatableColumn): Promise<void> {
        console.log('column', column);
        this.datatableColumns.push(column);
    }

    public async addDatatableFilter(filter: DatatableFilterColumn): Promise<void> {
        console.log('filter', filter);
        this.datatableFilterColumns.push(filter);
    }

    private async loadDatatableData(): Promise<void> {
        await this._service.findAll().then((data: any[]) => {
            this.datatableObjects = data;
        });
    }

}
