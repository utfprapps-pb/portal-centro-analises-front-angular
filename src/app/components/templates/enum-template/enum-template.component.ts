import { Component, Input } from '@angular/core';

import { getEnumColor, getEnumTranslation } from '../../../core/enums/enum-mapper';

@Component({
    selector: 'enum-template',
    templateUrl: './enum-template.component.html',
    styleUrl: './enum-template.component.scss'
})
export class EnumTemplateComponent {

    @Input() enum: string;
    @Input() field: string;
    @Input() data: any;
    public color: string = null;
    public value: string = null;

    constructor() {
    }

    public ngOnInit(): void {
        this.color = getEnumColor(this.enum, this.data[this.field]);
        this.value = getEnumTranslation(this.enum, this.getColumnData(this.data, this.field));
    }

    private getColumnData(data: any, field: string): String | number {
        if (field != null && field.includes('.')) {
            let path: string[] = field.split('.');
            const fieldPath = path.shift();
            return this.getColumnData(data[fieldPath], path.join('.'));
        } else {
            return data[field];
        }
    }

}
