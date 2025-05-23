import { Component, Input, ViewChild } from '@angular/core';
import { InputNumber as PrimeInputNumber } from 'primeng/inputnumber';

import { CompCtrlContainer } from '../../../core/directives/compctrl/compctrl.container';
import { InvalidInfoComponent } from '../../invalid-info/invalid-info.component';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
    selector: 'input-currency',
    templateUrl: './input-currency.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-currency.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputCurrency),
        CompCtrlContainer.PROVIDER(InputCurrency)
    ],
})
export class InputCurrency extends InputBaseComponent {

    @ViewChild('input') component: PrimeInputNumber;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input('max') max: number = null;
    @Input('min') min: number = 0;

    @Input('precision') precision: 2 | 4 | 6 = 2;

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
