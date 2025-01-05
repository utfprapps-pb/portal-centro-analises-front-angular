import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';

import { ChangePasswordDTO } from '../../../dtos/change-password.dto';
import { UserDTO } from '../../../dtos/user.dto';
import { ProfileService } from '../../../pages/profile/profile.service';
import { FormCrud } from '../../form-crud/form-crud';
import { FormCrudComponent } from '../../form-crud/form-crud.component';

@Component({
    selector: 'ChangePasswordComponent',
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent extends FormCrud<UserDTO> {

    @ViewChild('formView') public formView: FormCrudComponent;
    @Output() onChangeComplete: EventEmitter<boolean> = new EventEmitter();

    public changePassword: ChangePasswordDTO = new ChangePasswordDTO();
    public passwordConfirm: string = null;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ProfileService,
    ) {
        super(injector, service);
    }

    public override showButtons(button: string): boolean {
        return ['salvar', 'cancelar'].includes(button);
    }

    public override showHeader(): boolean {
        return false;
    }

    public override getObjectIdFromUrl(): number {
        return this.authentication.getUserLogged().id;
    }

    public override async onClickCancelar(): Promise<void> {
        this.onChangeComplete.emit(false);
    }

    public override async onSave(object: any): Promise<void> {
        object = this.convertUtilsService.cloneObject(this.changePassword);
        if (this.validateForm()) {
            this.blockForm();
            await this.onBeforeSave(object);
            this.service.changePassword(object).then(async (data) => {
                await this.onAfterSave(object, data);
                this.toastrService.showSuccess(this.pageTitle, 'Registro salvo com sucesso!');
                this.releaseForm();
                this.onChangeComplete.emit(true);
            }, error => {
                this.releaseForm();
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.pageTitle, 'Erro ao salvar Registro!');
                }
            });
        }
    }

}
