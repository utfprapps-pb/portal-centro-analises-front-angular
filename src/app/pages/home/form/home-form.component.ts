import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormComponent } from '../../../components/form-base/form-base';
import { FormBaseComponent } from '../../../components/form-base/form-base.component';

@Component({
    selector: 'HomeFormComponent',
    templateUrl: './home-form.component.html',
    styleUrl: './home-form.component.scss'
})
export class HomeFormComponent extends FormComponent implements OnInit, OnDestroy {

    @ViewChild('formView') public override formView: FormBaseComponent;
    public override pageTitle: string = "Página Inicial";

    constructor(
        protected override readonly injector: Injector,
    ) {
        super(injector);
    }

    public ngOnInit(): void {

    }

}
