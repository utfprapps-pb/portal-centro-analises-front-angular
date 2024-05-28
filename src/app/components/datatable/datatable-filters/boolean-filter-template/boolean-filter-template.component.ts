import { AfterViewInit, Component, Input } from '@angular/core';

import { getEnum, getEnumTranslation } from '../../../../core/enums/enum-mapper';
import { OperatorWhere } from '../../../../core/filter/operator-where.enum';
import { DatatableFilterColumn } from '../../datatable-columns/datatable-filter-column';
import { DatatableComponent } from '../../datatable/datatable.component';
import { FilterTemplateComponent } from '../datatable-filter-template.component';

@Component({
    selector: 'boolean-filter-template',
    templateUrl: './boolean-filter-template.component.html',
    styleUrl: './boolean-filter-template.component.scss'
})
export class BooleanFilterTemplateComponent extends FilterTemplateComponent implements AfterViewInit {

    @Input('datatable') datatable: DatatableComponent;
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
        const enumName = this.column.enumname;
        const enu = getEnum(enumName);
        for (const key in enu) {
            this.enumOptions.push({ key: key, value: getEnumTranslation(enumName, key) })
        }
    }

    public override clearValue(): void {
        this._enum = null;
        super.clearValue();
    }

    public override loadState(): void {
        super.loadState();
        this._enum = this.enumOptions.find(it => it.key == this.value);
    }

}

