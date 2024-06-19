import { Component, ContentChild, Input } from '@angular/core';

import { DatatableComponent } from '../../datatable/datatable.component';

@Component({
    selector: 'column-template',
    templateUrl: './column-template.component.html',
})
export class ColumnTemplateComponent {

    @ContentChild('itemColumn') itemColumn: any;

    @Input() visible: boolean = true;

    @Input() position: 'after' | 'before' = 'before';
    @Input() order: number = null;

    @Input() header: string = null;
    @Input() headerAlign: string = 'left';

    @Input() width: string = '40';
    @Input() minWidth: string = '180px';
    @Input() maxWidth: string = null;
    @Input() align: 'left' | 'center' | 'right' = 'left';

    constructor(
        private readonly dataTable: DatatableComponent
    ) {}

    ngAfterContentInit(): void {
        this.dataTable.addCustomColumnTemplate(this);
    }

    get template() {
        return this.itemColumn;
    }

}
