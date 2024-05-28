import { Component, Input, OnInit } from '@angular/core';

import { getEnumColor, getEnumTranslation } from '../../../../core/enums/enum-mapper';
import { DatatableColumn } from '../datatable-column';

@Component({
    selector: 'boolean-column-template',
    templateUrl: './boolean-column-template.component.html',
})
export class BooleanColumnTemplateComponent implements OnInit {

    @Input('column') column: DatatableColumn;
    @Input('data') data: any;
    public color: string = null;
    public value: string = null;

    constructor() {
    }

    public ngOnInit(): void {
        const valor = !!this.data[this.column.field] ? 'TRUE' : 'FALSE';
        this.color = getEnumColor(this.column.enumname, valor);
        this.value = getEnumTranslation(this.column.enumname, valor);
    }

}
