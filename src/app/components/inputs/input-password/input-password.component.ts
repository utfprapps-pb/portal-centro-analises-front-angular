import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
    selector: 'input-password',
    templateUrl: './input-password.component.html',
    styleUrl: './input-password.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPasswordComponent),
            multi: true,
        },
    ],
})
export class InputPasswordComponent extends InputBaseComponent {

    public fieldType: 'text' | 'password' = 'password';

    public changeFieldType(): void {
        this.fieldType = this.fieldType == 'text' ? 'password' : 'text';
    }

}
