import { Component, Input, OnInit } from '@angular/core';
import { DatatableColumn } from '../datatable-column';

@Component({
    selector: 'currency-column-template',
    templateUrl: './currency-column-template.component.html',
})
export class CurrencyColumnTemplateComponent implements OnInit {

    @Input('column') column: DatatableColumn;
    @Input('data') data: any;
    public value: string = null;

    constructor() {
    }

    public ngOnInit(): void {
        this.value = this.data[this.column.field];
    }

}
