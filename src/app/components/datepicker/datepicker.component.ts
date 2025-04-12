import { Component, Input, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';

import { CompCtrlContainer } from '../../core/directives/compctrl/compctrl.container';
import { InputBaseComponent } from '../inputs/input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(DatePicker),
        CompCtrlContainer.PROVIDER(DatePicker)
    ],
})
export class DatePicker extends InputBaseComponent {

    @ViewChild('input') component: Calendar;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;
    @Input() showTime: boolean = false;

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            this.component.inputfieldViewChild.nativeElement.focus();
        });
    }

    override writeValue(value: any): void {
        if (!!this.getContainer()) {
            if (!!value) {
                value = new Date(value);
            }
            this._innerValue = value;
        }
    }

    public setToday(): void {
        this.innerValue = new Date();
    }
}
