import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'invalid-info',
    templateUrl: './invalid-info.component.html',
    styleUrl: './invalid-info.component.scss'
})
export class InvalidInfoComponent {

    @ViewChild('pop') pop: OverlayPanel;
    @ViewChild('info') private info: ElementRef;

    @Input() causes: string[];

    public show() {
        if (!!this.info) {
            this.pop.show(null, this.info.nativeElement);
        }
    }

}
