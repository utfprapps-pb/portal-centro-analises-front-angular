import { Component, Input } from '@angular/core';

import { OperatorWhere } from '../../../../core/filter/operator-where.enum';
import { DatatableFilterColumn } from '../../datatable-columns/datatable-filter-column';
import { DatatableComponent } from '../../datatable/datatable.component';
import { FilterTemplateComponent } from '../datatable-filter-template.component';

@Component({
    selector: 'text-filter-template',
    templateUrl: './text-filter-template.component.html',
    styleUrl: './text-filter-template.component.scss'
})
export class TextFilterTemplateComponent extends FilterTemplateComponent {

    @Input('datatable') datatable: DatatableComponent;
    @Input('column') column: DatatableFilterColumn;

    protected override readonly defaultOperatorWhere: OperatorWhere = OperatorWhere.CONTAINS;

    public override operators: OperatorWhere[] = [
        OperatorWhere.CONTAINS,
        OperatorWhere.EQUALS,
        OperatorWhere.NOTEQUALS,
        OperatorWhere.LT,
        OperatorWhere.LTE,
        OperatorWhere.GT,
        OperatorWhere.GTE,
    ]

}
