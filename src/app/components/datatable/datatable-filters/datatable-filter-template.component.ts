import { Injectable, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

import { OperatorWhere, operatorWhereObject } from '../../../core/filter/operator-where.enum';
import { DatatableFilterColumn } from '../datatable-columns/datatable-filter-column';

@Injectable()
export abstract class FilterTemplateComponent implements OnInit {

    abstract table: Table;
    abstract column: DatatableFilterColumn;

    protected readonly defaultOperatorWhere: OperatorWhere = OperatorWhere.EQUALS

    private _operation: { operator: OperatorWhere, text: string, icon: string };
    set operation(value: any) {
        this._operation = value;
        this.changeFilter();
    }
    get operation() {
        return this._operation;
    }

    public operators: OperatorWhere[] = [this.defaultOperatorWhere];
    public operatorsEntities: { operator: OperatorWhere, text: string, icon: string }[] = [];

    private _value: any = null;
    set value(v: any) {
        this._value = v;
        this.changeFilter();
    }

    private changeFilter(): void {
        this.table.filter(this._value, this.column.field, this.operation.operator);
    }

    public ngOnInit(): void {
        this.operation = operatorWhereObject(this.defaultOperatorWhere);
        this.operatorsEntities = this.operators.map(operatorWhereObject);
    }

}

