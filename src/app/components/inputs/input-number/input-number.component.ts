import { Component, Input, ViewChild } from '@angular/core';
import { InputNumber as PrimeInputNumber } from 'primeng/inputnumber';

import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InputBaseComponent } from '../input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-number.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputNumber),
        CompCtrlContainer.PROVIDER(InputNumber)
    ],
})
export class InputNumber extends InputBaseComponent {

    @ViewChild('input') component: PrimeInputNumber;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input('showClear') showClear: boolean = true;
    @Input('max') max: number = null;
    @Input('min') min: number = 0;

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            this.component.input.nativeElement.focus();
        });
    }

}
