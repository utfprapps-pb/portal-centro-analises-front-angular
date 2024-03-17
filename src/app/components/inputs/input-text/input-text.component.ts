import { Component, ViewChild } from '@angular/core';

import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';
import { InputBaseComponent } from './../input-base/input-base.component';

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-text.component.scss'],
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
