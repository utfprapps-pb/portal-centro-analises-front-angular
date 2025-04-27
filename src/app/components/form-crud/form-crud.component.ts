import { Component, Injector, Input } from '@angular/core';

import { FormBaseComponent } from './../form-base/form-base.component';

@Component({
    selector: 'form-crud',
    templateUrl: './form-crud.component.html',
    styleUrl: './form-crud.component.scss'
})
export class FormCrudComponent extends FormBaseComponent {

    @Input() vertical_space: boolean = true;

    constructor(
        protected override readonly injector: Injector
    ) {
        super(injector);
    }

    public showHeader(): boolean {
        return true;
    }

    public showFooter(): boolean {
        return true;
    }

    public showButtons(button: string): boolean | void {
    }

    public objectUpdating(): boolean {
        return false;
    }

    public async onClickSalvar(): Promise<void> { }

    public async onClickCancelar(): Promise<void> { }

    public async onClickExcluir(): Promise<void> { }

    public exitOnSave(): boolean {
        return true;
    }

    public async onBeforeSave(object: any): Promise<void> { }

    public async onSave(object: any): Promise<void> { }

    public async onAfterSave(object: any, server: any): Promise<void> { }

    public async onExcluir(object: any): Promise<void> { }

}
