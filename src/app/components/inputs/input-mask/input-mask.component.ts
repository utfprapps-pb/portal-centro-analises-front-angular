import { Component, Input, ViewChild } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { CompCtrlContainer } from '../../compctrl/compctrl.container';
import { InputBaseComponent } from '../input-base/input-base.component';
import { InvalidInfoComponent } from '../invalid-info/invalid-info.component';

@Component({
    selector: 'input-mask',
    templateUrl: './input-mask.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-mask.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputMaskComponent),
        CompCtrlContainer.PROVIDER(InputMaskComponent)
    ],
})
export class InputMaskComponent extends InputBaseComponent {

    @ViewChild('input') component: InputMask;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() set mask(value: string) {
        let pattern = '*';
        if (value == 'cpf') {
            pattern = '999.999.999-99';
            this.placeholder = '___.___.___-__';
        } else if (value == 'cnpj') {
            pattern = '99.999.999/9999-99'
            this.placeholder = '__.___.___/____-__';
        }
        this._mask = pattern;
    }

    public _mask: string = null;
    public slotChar: string = '_';

    override getContainer(): any {
        return this.component;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        this.component.focus();
    }

}
