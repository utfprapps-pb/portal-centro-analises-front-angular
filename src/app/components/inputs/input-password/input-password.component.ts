import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { CompCtrlContainer } from '../../../core/directives/compctrl/compctrl.container';
import { ObjectUtils } from '../../../utils/object-utils';
import { InvalidInfoComponent } from '../../invalid-info/invalid-info.component';
import { InputBaseComponent } from '../input-base/input-base.component';

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

    @Input('equals') equals: string = null;
    @Input('allowToggle') allowToggle: boolean = true;
    @Input('password') realPassword: boolean = false;

    public visibilityType: 'text' | 'password' = 'password';

    public changevisibilityType(): void {
        if (!this.disabled) {
            this.visibilityType = this.visibilityType == 'text' ? 'password' : 'text';
        }
    }

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            this.component.nativeElement.focus();
        });
    }

    override validate(): string[] {
        const causes = super.validate();
        if (ObjectUtils.isNotEmpty(this.equals)) {
            if (this.innerValue != this.equals) {
                causes.push('Valor divergente do esperado!');
            }
        }
        return causes;
    }

}
