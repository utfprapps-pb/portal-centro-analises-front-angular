import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { Constants } from '../../../core/constants/constants';
import { StorageManager } from '../../../core/managers/storage-manager';
import { UserLoginDTO } from '../../../dtos/user-login-dto';
import { UserDTO } from '../../../dtos/user.dto';
import { ObjectUtils } from '../../../utils/object-utils';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'ProfileFormComponent',
    templateUrl: './profile-form.component.html',
    styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent extends FormCrud<UserDTO> {

    @ViewChild('formView') public formView: FormCrudComponent;

    public readonly PF: String = 'PF';
    public readonly PJ: String = 'PJ';

    public startedWithRA: boolean = false;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ProfileService,
    ) {
        super(injector, service);
    }

    public override getObjectIdFromUrl(): number {
        return this.authentication.getUserLogged().id;
    }

    public override exitOnSave(): boolean {
        return false;
    }

    public override onAfterLoadObject(object: UserDTO): Promise<void> {
        if (this.isAluno) {
            this.startedWithRA = ObjectUtils.isNotEmpty(object.raSiape);
        }
        return super.onAfterLoadObject(object);
    }

    public override async onAfterSave(object: any, server: UserDTO): Promise<void> {
        const userLoginDto: UserLoginDTO = new UserLoginDTO();
        userLoginDto.id = server.id;
        userLoginDto.displayName = server.name;
        userLoginDto.email = server.email;
        userLoginDto.role = server.role;
        userLoginDto.raSiape = server.raSiape;
        StorageManager.setItem(Constants.USER, JSON.stringify(userLoginDto));
        this.authentication.identity(true);
    }

    public override showButtons(button: string): boolean {
        return !['excluir'].includes(button);
    }

}
