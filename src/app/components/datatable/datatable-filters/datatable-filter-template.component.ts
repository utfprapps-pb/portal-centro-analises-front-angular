import { Injectable, OnInit } from '@angular/core';
import { FilterMetadata, TableState } from 'primeng/api';

import { OperatorWhere, operatorWhereObject } from '../../../core/filter/operator-where.enum';
import { ObjectUtils } from '../../../utils/object-utils';
import { DatatableFilterColumn } from '../datatable-columns/datatable-filter-column';
import { DatatableComponent } from '../datatable/datatable.component';

@Injectable()
export abstract class FilterTemplateComponent implements OnInit {

    abstract datatable: DatatableComponent;
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
    get value() {
        return this._value;
    }
    set value(v: any) {
        this._value = v;
        this.changeFilter();
    }

    public changeFilter(): void {
        if (this.datatable.table == undefined) {
            setTimeout(() => {
                this.changeFilter();
            }, 200);
            return;
        }
        this.datatable.table.filter(this._value, this.column.field, this.operation.operator);
    }

    public ngOnInit(): void {
        this.operation = operatorWhereObject(this.defaultOperatorWhere);
        this.operatorsEntities = this.operators.map(operatorWhereObject);
        if (this.datatable.table == undefined) {
            setTimeout(() => {
                this.ngOnInit();
            });
            return;
        }
        this.datatable.addFilterColumn(this);
    }

    public clearValue(): void {
        this._value = null;
    }

    public loadState(): void {
        const state = localStorage.getItem(this.datatable.table.stateKey);
        if (ObjectUtils.isNotEmpty(state)) {
            const stateObject: TableState = JSON.parse(state);
            const filter = (stateObject.filters) || null;
            if (!!filter && !!filter[this.column.field]) {
                const filterMetadata: FilterMetadata = (filter[this.column.field] as FilterMetadata);
                this._value = filterMetadata.value;
                const operator = filterMetadata.matchMode
                this._operation = this.operatorsEntities.find(it => it.operator == operator);
            }
        }
    }

}

