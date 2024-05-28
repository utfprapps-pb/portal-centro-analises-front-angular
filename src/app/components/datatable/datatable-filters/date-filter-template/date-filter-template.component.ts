import { Component, Input } from '@angular/core';

import { OperatorWhere } from '../../../../core/filter/operator-where.enum';
import { DatatableFilterColumn } from '../../datatable-columns/datatable-filter-column';
import { DatatableComponent } from '../../datatable/datatable.component';
import { FilterTemplateComponent } from '../datatable-filter-template.component';

@Component({
    selector: 'date-filter-template',
    templateUrl: './date-filter-template.component.html',
    styleUrl: './date-filter-template.component.scss'
})
export class DateFilterTemplateComponent extends FilterTemplateComponent {

    @Input('datatable') datatable: DatatableComponent;
    @Input('column') column: DatatableFilterColumn;

    protected override readonly defaultOperatorWhere: OperatorWhere = OperatorWhere.EQUALS;

    public override operators: OperatorWhere[] = [
        OperatorWhere.EQUALS,
        OperatorWhere.NOTEQUALS,
        OperatorWhere.LT,
        OperatorWhere.LTE,
        OperatorWhere.GT,
        OperatorWhere.GTE,
    ]

    private _date: Date = null;
    set date(value: Date) {
        if (this._date != value || (!!value && !!this._date && this._date.getTime() != value.getTime())) {
            this._date = value;
            this.value = !!value ? this._date : null;
        }
    }
    get date() {
        return this._date;
    }

    public override clearValue(): void {
        this._date = null;
        super.clearValue();
    }

    public override loadState(): void {
        super.loadState();
        if (this.value != null) {
            this._date = new Date(this.value);
        }
    }

}
