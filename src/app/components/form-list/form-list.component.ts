import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { FormBaseComponent } from '../form-base/form-base.component';

@Component({
    selector: 'form-list',
    templateUrl: './form-list.component.html',
    styleUrl: './form-list.component.scss'
})
export class FormListComponent<T extends ZModel> extends FormBaseComponent implements OnInit {

    @ViewChild('formViewTable') public formViewTable: Table;

    public title: string = null

    get service(): GenericCrudService<T> {
        return null;
    }

    constructor(
        protected override readonly injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.title = this.pageTitle;
    }

    public showFooter(): boolean {
        return true;
    }

    public showButtons(button: string): boolean {
        return true;
    }

    public async onClickCancelar(): Promise<void> { }

}
