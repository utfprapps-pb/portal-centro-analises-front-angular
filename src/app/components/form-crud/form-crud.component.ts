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

    public showFooter(): boolean {
        return true;
    }

    public showButtons(button: string): boolean {
        return true;
    }

    public async onClickSalvar(): Promise<void> { }

    public async onClickCancelar(): Promise<void> { }

    public exitOnSave(): boolean {
        return true;
    }

    public async onBeforeSave(object: any): Promise<void> { }

    public async onSave(object: any): Promise<void> { }

    public async onAfterSave(object: any): Promise<void> { }



}
