import { Component, Input, OnInit } from '@angular/core';

import { getEnumColor, getEnumTranslation } from '../../../../core/enums/enum-mapper';
import { DatatableColumn } from '../datatable-column';

@Component({
    selector: 'enum-column-template',
    templateUrl: './enum-column-template.component.html',
})
export class EnumColumnTemplateComponent implements OnInit {

    @Input('column') column: DatatableColumn;
    @Input('data') data: any;
    public color: string = null;
    public value: string = null;

    constructor() {
    }

    public ngOnInit(): void {
        this.color = getEnumColor(this.column.enumname, this.data[this.column.field]);
        this.value = getEnumTranslation(this.column.enumname, this.data[this.column.field]);
    }

}
