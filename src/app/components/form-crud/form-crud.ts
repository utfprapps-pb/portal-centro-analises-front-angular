import { AfterViewInit, Injectable, Injector } from '@angular/core';

import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { FormBase } from '../form-base/form-base';
import { FormCrudComponent } from './form-crud.component';

@Injectable()
export abstract class FormCrud<T extends ZModel> extends FormBase implements AfterViewInit {

    public abstract override formView: FormCrudComponent;

    public object: T;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: GenericCrudService<T>,
    ) {
        super(injector, service)
        this.object = this.service.createInstance();
    }

    public ngAfterViewInit(): void {
        this.bindMethods();
    }

    private bindMethods(): void {
        if (this.formView == undefined) {
            setTimeout(() => {
                this.bindMethods();
            }, 500);
            return;
        }
        this.formView.showButtons = (button) => this.showButtons(button);
    }

    public showButtons(button: string): boolean {
        return true;
    }


}
