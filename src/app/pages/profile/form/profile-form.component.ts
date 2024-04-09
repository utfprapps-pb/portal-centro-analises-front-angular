import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { User } from '../model/user.model';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'ProfileFormComponent',
    templateUrl: './profile-form.component.html',
    styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent extends FormCrud<User> {

    @ViewChild('formView') public formView: FormCrudComponent;


    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ProfileService,
    ) {
        super(injector, service);
        this.object.name = this.authentication.getUserLogged().displayName;
        this.object.email = this.authentication.getUserLogged().email;
    }


}
