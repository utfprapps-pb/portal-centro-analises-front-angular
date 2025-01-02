import { Component, Input, ViewChild } from '@angular/core';

import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InputBaseComponent } from '../input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'input-textarea',
    templateUrl: './input-textarea.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-textarea.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputTextAreaComponent),
        CompCtrlContainer.PROVIDER(InputTextAreaComponent)
    ],
})
export class InputTextAreaComponent extends InputBaseComponent {

    @ViewChild('input') component: any;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input('rows') rows: number = 5;
    @Input('autoResize') autoResize: boolean = false;

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        (this.component.nativeElement as HTMLTextAreaElement).focus();
    }

}
