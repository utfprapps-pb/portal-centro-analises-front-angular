import { Component, ViewChild } from '@angular/core';

import { ObjectUtils } from '../../../utils/object-utils';
import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InputBaseComponent } from '../input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'input-email',
    templateUrl: './input-email.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-email.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputEmailComponent),
        CompCtrlContainer.PROVIDER(InputEmailComponent)
    ],
})
export class InputEmailComponent extends InputBaseComponent {

    @ViewChild('input') component: any;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        setTimeout(() => {
            (this.component.nativeElement as HTMLInputElement).focus();
        });
    }

    override validate(): string[] {
        const causes = super.validate();

        if (ObjectUtils.isNotEmpty(this.innerValue) && !this.emailRegex.test(this.innerValue)) {
            causes.push('Formato de email inválido');
        }

        return causes;
    }

}
