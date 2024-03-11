import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputBaseComponent } from './../input-base/input-base.component';

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputTextComponent),
            multi: true,
        },
    ],
})
export class InputTextComponent extends InputBaseComponent {

}
