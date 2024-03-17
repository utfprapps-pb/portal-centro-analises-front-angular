import { Component, ElementRef, ViewChild } from '@angular/core';

import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InputBaseComponent } from '../input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-password.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputPasswordComponent),
        CompCtrlContainer.PROVIDER(InputPasswordComponent)
    ],
})
export class InputPasswordComponent extends InputBaseComponent {

    @ViewChild('input') component: ElementRef;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    public fieldType: 'text' | 'password' = 'password';

    public changeFieldType(): void {
        if (!this.disabled) {
            this.fieldType = this.fieldType == 'text' ? 'password' : 'text';
        }
    }

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
