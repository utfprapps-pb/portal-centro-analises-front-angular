import { Component, Injector } from '@angular/core';

import { FormBaseComponent } from './../form-base/form-base.component';

@Component({
    selector: 'form-crud',
    templateUrl: './form-crud.component.html',
    styleUrl: './form-crud.component.scss'
})
export class FormCrudComponent extends FormBaseComponent {

    constructor(
        protected override readonly injector: Injector
    ) {
        super(injector);
    }

    public showButtons(button: string): boolean {
        return true;
    }

}
