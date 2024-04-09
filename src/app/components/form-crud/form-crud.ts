import { Injectable, Injector } from '@angular/core';

import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { FormBase } from '../form-base/form-base';

@Injectable()
export abstract class FormCrud<T extends ZModel> extends FormBase {

    public object: T;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: GenericCrudService<T>,
    ) {
        super(injector, service)
        this.object = this.service.createInstance();
    }


}
