import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormBase } from '../../../components/form-base/form-base';
import { FormBaseComponent } from '../../../components/form-base/form-base.component';
import { HomeService } from '../home.service';

@Component({
    selector: 'HomeFormComponent',
    templateUrl: './home-form.component.html',
    styleUrl: './home-form.component.scss'
})
export class HomeFormComponent extends FormBase implements OnInit, OnDestroy {

    @ViewChild('formView') public override formView: FormBaseComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: HomeService,
    ) {
        super(injector, service);
    }

    public ngOnInit(): void {

    }

}
