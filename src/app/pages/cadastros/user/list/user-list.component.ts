import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../../components/form-list/form-list';
import { FormListComponent } from '../../../../components/form-list/form-list.component';
import { WebsocketService } from '../../../../core/services/websocket.service';
import { User } from '../model/user.model';
import { UserBalance } from '../model/userbalance.model';
import { UserService } from '../user.service';

@Component({
    selector: 'UserListComponent',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})
export class UserListComponent extends FormList<User> {

    @ViewChild('formView') public formView: FormListComponent<User>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    public balances: UserBalance[] = []

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: UserService,
        public readonly ws: WebsocketService
    ) {
        super(injector, service);
        this.service.getGlobalBalance().then((res: UserBalance[]) => this.balances = res);
        this.subscriptions.push(
            this.ws.globalUserBalance$.subscribe((balance: UserBalance) => {
                if (this.balances.find(it => it.id == balance.id)) {
                    this.balances.find(it => it.id == balance.id).balance = balance.balance;
                } else {
                    this.balances.push(balance);
                }

                if (this.formViewDatatable) {
                    this.formViewDatatable.onClickRefresh();
                }
            })
        );
    }

    public override showButtons(button: string): boolean {
        return ['cancelar'].includes(button);
    }

    public onLoadData(data: User[]): void {
        for (const user of data) {
            user.balance = this.balances.find((balance: UserBalance) => balance.user.id === user.id)?.balance || 0;
        }
    }
}
