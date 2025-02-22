import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { Roles } from '../../../../core/enums/roles.enum';
import { UserType } from '../../../../core/enums/user-type.enum';
import { ObjectUtils } from '../../../../utils/object-utils';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
    selector: 'UserFormComponent',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent extends FormCrud<User> {

    @ViewChild('formView') public formView: FormCrudComponent;

    public readonly PF: String = 'PF';
    public readonly PJ: String = 'PJ';

    public maskRole: Roles = Roles.ROLE_EXTERNAL;
    public maskType: UserType = UserType.PF;
    public cpf: string = '';
    public cnpj: string = '';

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: UserService,
    ) {
        super(injector, service);
    }

    public override showButtons(button: string): boolean {
        return !['excluir'].includes(button);
    }

    public override onLoadObject(object: User): void {
        if (!!object.type) {
            if (object.type == this.PF) {
                this.cpf = object.cpfCnpj;
            } else {
                this.cnpj = object.cpfCnpj;
            }
        } else {
            object.type = UserType.PF;
        }
        this.maskType = object.type;
        this.maskRole = object.role;
    }

    public onChangeRole(): void {
        if (this.maskRole != this.object.role) {
            this.object.raSiape = null;
            this.maskRole = this.object.role;
        }
    }

    public onChangeTipoPessoa(): void {
        if (this.maskType != this.object.type) {
            this.cpf = '';
            this.cnpj = '';
            this.maskType = this.object.type;
        }
    }

    public override async onBeforeSave(object: User): Promise<void> {
        if (object.type == this.PF) {
            object.cpfCnpj = ObjectUtils.isNotEmpty(this.cpf) ? this.cpf : null;
        } else {
            object.cpfCnpj = ObjectUtils.isNotEmpty(this.cnpj) ? this.cnpj : null;
        }
        if (object.role != Roles.ROLE_STUDENT) {
            object.raSiape = null;
        }
    }

}
