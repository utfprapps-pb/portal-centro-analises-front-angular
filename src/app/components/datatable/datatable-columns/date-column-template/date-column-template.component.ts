import { Component, Input, OnInit } from '@angular/core';

import { DatatableColumn } from '../datatable-column';

@Component({
    selector: 'date-column-template',
    templateUrl: './date-column-template.component.html',
})
export class DateColumnTemplateComponent implements OnInit {

    @Input('column') column: DatatableColumn;
    @Input('data') data: any;
    public value: string = null;

    constructor() {
    }

    public ngOnInit(): void {
        this.value = this.data[this.column.field];
    }

}
