import { Component, Injector, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { FormBaseComponent } from '../form-base/form-base.component';

@Component({
    selector: 'form-list',
    templateUrl: './form-list.component.html',
    styleUrl: './form-list.component.scss'
})
export class FormListComponent<T extends ZModel> extends FormBaseComponent {

    @ViewChild('formViewTable') public formViewTable: Table;

    get service(): GenericCrudService<T> {
        return null;
    }

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

    public async onClickAddNovo(): Promise<void> { }

    public async onClickCancelar(): Promise<void> { }

}
