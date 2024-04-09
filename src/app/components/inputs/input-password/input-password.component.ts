import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { ObjectUtils } from '../../../utils/object-utils';
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

    @Input('equals') equals: string = null;
    @Input('allowToggle') allowToggle: boolean = true;

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
