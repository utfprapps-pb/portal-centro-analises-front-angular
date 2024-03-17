import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, take } from 'rxjs';

import { Constants } from '../../../../assets/constants';
import { FormComponent } from '../../../components/form-base/form-base';
import { FormBaseComponent } from '../../../components/form-base/form-base.component';
import { StorageManager } from '../../../utils/storage-manager';
import { Login } from '../model/login.model';
import { AppComponent } from './../../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent extends FormComponent implements OnInit, OnDestroy {

    @ViewChild('formView') public override formView: FormBaseComponent;

    private subscriptions: Subscription[] = [];

    public isMobile: boolean = false;

    public object: Login = new Login();

    constructor(
        protected override readonly injector: Injector,
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        AppComponent.isMobile.subscribe(value => {
            this.isMobile = value;
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(it => it.unsubscribe());
    }

    public onClickEntrar(): void {
        this.blockForm();
        if (this.validateForm(true)) {
            this.loginService.login(this.object).pipe(take(1)).subscribe(data => {
                this.releaseForm()
                StorageManager.setItem(Constants.TOKEN, data.token);
                StorageManager.setItem(Constants.USER, JSON.stringify(data.user));
            }, error => {
                this.releaseForm();
                console.error(error);
            })
        } else {
            this.releaseForm();
        }
    }

}
