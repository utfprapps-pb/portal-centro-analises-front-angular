import { AfterViewInit, Component, Input } from '@angular/core';
import { Table } from 'primeng/table';

import { getEnum, getEnumTranslation } from '../../../../core/enums/enum-mapper';
import { OperatorWhere } from '../../../../core/filter/operator-where.enum';
import { DatatableFilterColumn } from '../../datatable-columns/datatable-filter-column';
import { FilterTemplateComponent } from '../datatable-filter-template.component';

@Component({
    selector: 'enum-filter-template',
    templateUrl: './enum-filter-template.component.html',
    styleUrl: './enum-filter-template.component.scss'
})
export class EnumFilterTemplateComponent extends FilterTemplateComponent implements AfterViewInit {

    @Input('datatable') table: Table;
    @Input('column') column: DatatableFilterColumn;

    public enumOptions: { key: string, value: string }[] = [];
    private _enum: { key: string, value: string };
    set enum(value: any) {
        this._enum = value;
        this.value = !!value ? value.key : null;
    }
    get enum() {
        return this._enum;
    }

    public override operators: OperatorWhere[] = [
        OperatorWhere.EQUALS,
        OperatorWhere.NOTEQUALS
    ]

    public ngAfterViewInit(): void {
        console.log(this);
        const enumName = this.column.enumname;
        const enu = getEnum(enumName);
        for (const key in enu) {
            this.enumOptions.push({ key: key, value: getEnumTranslation(enumName, key) })
        }
    }

}

