import { Component, ViewChild } from '@angular/core';

import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InputBaseComponent } from '../input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'input-textarea',
    templateUrl: './input-textarea.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-textarea.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputTextComponent),
        CompCtrlContainer.PROVIDER(InputTextComponent)
    ],
})
export class InputTextComponent extends InputBaseComponent {

    @ViewChild('input') component: any;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        (this.component.nativeElement as HTMLInputElement).focus();
    }

}
