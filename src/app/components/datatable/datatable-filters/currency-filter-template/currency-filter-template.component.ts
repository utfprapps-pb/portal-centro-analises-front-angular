import { Component, Input } from '@angular/core';

import { OperatorWhere } from '../../../../core/filter/operator-where.enum';
import { DatatableFilterColumn } from '../../datatable-columns/datatable-filter-column';
import { DatatableComponent } from '../../datatable/datatable.component';
import { FilterTemplateComponent } from '../datatable-filter-template.component';

@Component({
    selector: 'currency-filter-template',
    templateUrl: './currency-filter-template.component.html',
    styleUrl: './currency-filter-template.component.scss'
})
export class CurrencyFilterTemplateComponent extends FilterTemplateComponent {

    @Input('datatable') datatable: DatatableComponent;
    @Input('column') column: DatatableFilterColumn;

    public override operators: OperatorWhere[] = [
        OperatorWhere.EQUALS,
        OperatorWhere.NOTEQUALS,
        OperatorWhere.LT,
        OperatorWhere.LTE,
        OperatorWhere.GT,
        OperatorWhere.GTE,
    ]

}
