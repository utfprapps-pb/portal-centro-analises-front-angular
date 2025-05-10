import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportCardModel } from './report-card.model';

@Component({
    selector: 'report-card',
    templateUrl: './report-card.component.html',
    styleUrl: './report-card.component.scss'
})
export class ReportCardComponent {

    @Input() public title: string;
    @Input() public description: string;
    @Input() public icon: string;
    @Input() public color: string;

    @Input() public onClick: () => void;

    @Input() set object(value: ReportCardModel) {
        this.title = value.title;
        this.description = value.description;
        this.icon = value.icon;
        this.color = value.color;
        this.onClick = value.onClick;
    }

}
