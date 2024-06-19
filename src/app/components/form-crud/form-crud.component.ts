import { Component, Injector, OnInit } from '@angular/core';

import { FormBaseComponent } from './../form-base/form-base.component';

@Component({
    selector: 'form-crud',
    templateUrl: './form-crud.component.html',
    styleUrl: './form-crud.component.scss'
})
export class FormCrudComponent extends FormBaseComponent implements OnInit {

    public title: string = null;

    constructor(
        protected override readonly injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.title = this.pageTitle;
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
