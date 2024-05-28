import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
    selector: 'UserListComponent',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})
export class UserListComponent extends FormList<User> {

    @ViewChild('formView') public formView: FormListComponent<User>;
    @ViewChild('formViewTable') public formViewDatatable: DatatableComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: UserService,
    ) {
        super(injector, service);
    }

    public override showButtons(button: string): boolean {
        return ['cancelar'].indexOf(button) != -1;
    }

}
