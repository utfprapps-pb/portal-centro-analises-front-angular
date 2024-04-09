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

}
