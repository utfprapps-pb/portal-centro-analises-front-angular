import { Component, Input } from '@angular/core';

import { DatatableColumn } from '../datatable-column';

@Component({
    selector: 'enum-column-template',
    templateUrl: './enum-column-template.component.html',
})
export class EnumColumnTemplateComponent {

    @Input('column') column: DatatableColumn;
    @Input('data') data: any;

}
