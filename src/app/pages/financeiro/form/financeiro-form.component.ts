import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { FinanceState } from '../../../core/enums/financestate.enum';
import { User } from '../../cadastros/user/model/user.model';
import { UserService } from '../../cadastros/user/user.service';
import { FinanceiroService } from '../financeiro.service';
import { Finance } from '../model/finance.model';


@Component({
    selector: 'FinanceiroFormComponent',
    templateUrl: './financeiro-form.component.html',
    styleUrl: './financeiro-form.component.scss'
})
export class FinanceiroFormComponent extends FormCrud<Finance> {

    @ViewChild('formView') public formView: FormCrudComponent;
    public usuariosSistema: User[] = [];
    public readonly TIPO_PAGAMENTO = 'PAID';

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: FinanceiroService,
        protected readonly userService: UserService,
    ) {
        super(injector, service);
        if (this.isAdmin) {
            this.userService.findAll().then(async data => {
                this.usuariosSistema = data;
            });
        }
    }

    public override showButtons(button: string): boolean {
        if (this.isAdmin) {
            return true;
        } else {
            return ['cancelar'].includes(button);
        }
    }

    public override async onAfterLoadObject(object: Finance): Promise<void> {
        if (this.objectUpdating() && object?.solicitation?.id != undefined) {
            this.disableForm(true);
        }
        super.onAfterLoadObject(object);
        if (!this.isAdmin) {
            this.disableForm(true);
        }
    }

    public filterOptions(options: any[]): any[] {
        if (this.objectUpdating() && this.object.solicitation?.id != null) {
            options = options.filter((option) => [FinanceState.RECEIVED, FinanceState.PENDING].includes(option.value));
        } else if (this.object.solicitation?.id == null) {
            options = options.filter((option) => [FinanceState.RECEIVED, FinanceState.PAID].includes(option.value));
        }
        return options;
    }

    protected override async onBeforeSave(object: Finance): Promise<void> {
        if (object.createdBy?.id == null) {
            object.createdBy = null;
        }
        if (object.updatedBy?.id == null) {
            object.updatedBy = null;
        }
        if (object.responsavel?.id == null) {
            object.responsavel = null;
        }
        if (object.pagador?.id == null) {
            object.pagador = null;
        }
        if (object.solicitation?.id == null) {
            object.solicitation = null;
        }
        if (object.state == 'PAID') {
            object.pagador = null;
        }
    }

    public getBucketName(): string {
        return `${this.authentication.getUserLogged().id}`
    }
}
