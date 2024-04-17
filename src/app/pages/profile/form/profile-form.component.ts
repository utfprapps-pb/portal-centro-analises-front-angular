import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { ChangePasswordDTO } from '../../../dtos/change-password.dto';
import { UserDTO } from '../../../dtos/user.dto';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'ProfileFormComponent',
    templateUrl: './profile-form.component.html',
    styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent extends FormCrud<UserDTO> {

    @ViewChild('formView') public formView: FormCrudComponent;

    public changePassword: ChangePasswordDTO = new ChangePasswordDTO();

    public passwordConfirm: string = null;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ProfileService,
    ) {
        super(injector, service);
        this.object.name = this.authentication.getUserLogged().displayName;
        this.object.email = this.authentication.getUserLogged().email;
    }

    public override async onSave(object: any): Promise<void> {
        object = this.convertUtilsService.cloneObject(this.changePassword);
        if (this.validateForm()) {
            this.blockForm();
            await this.onBeforeSave(object);
            this.service.changePassword(object).then(async (data) => {
                await this.onAfterSave(object);
                this.toastrService.showSuccess(this.pageTitle, 'Registro salvo com sucesso!');
                this.releaseForm();
                if (this.exitOnSave()) {
                    this.onCancel();
                }
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
