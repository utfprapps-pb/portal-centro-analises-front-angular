import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { Constants } from '../../../core/constants/constants';
import { Roles } from '../../../core/enums/roles.enum';
import { StorageManager } from '../../../core/managers/storage-manager';
import { UserLoginDTO } from '../../../dtos/user-login-dto';
import { UserDTO } from '../../../dtos/user.dto';
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

    public override async onAfterSave(object: any, server: UserDTO): Promise<void> {
        const userLoginDto: UserLoginDTO = new UserLoginDTO();
        userLoginDto.id = server.id;
        userLoginDto.displayName = server.name;
        userLoginDto.email = server.email;
        userLoginDto.role = server.role;
        StorageManager.setItem(Constants.USER, JSON.stringify(userLoginDto));
        this.authentication.identity(true);
    }

    public isStudant(): boolean {
        return this.object.role == Roles.ROLE_STUDENT;
    }

}
