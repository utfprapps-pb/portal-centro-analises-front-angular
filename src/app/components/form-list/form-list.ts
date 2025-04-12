import 'reflect-metadata';

import { AfterContentInit, Injectable, Injector } from '@angular/core';

import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { DatatableComponent } from '../datatable/datatable/datatable.component';
import { FormBase } from '../form-base/form-base';
import { FormListComponent } from './form-list.component';

@Injectable()
export abstract class FormList<T extends ZModel> extends FormBase implements AfterContentInit  {

    public abstract override formView: FormListComponent<T>;
    public abstract formViewDatatable: DatatableComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: GenericCrudService<T>,
    ) {
        super(injector, service)
    }

    public ngAfterContentInit(): void {
        this.bindMethods();
    }

    private async bindMethods(): Promise<void> {
        if (this.formView == undefined) {
            setTimeout(async () => {
                await this.bindMethods();
            }, 10);
            return;
        }
        this.formView.showFooter = () => this.showFooter();
        this.formView.showButtons = (button: string) => this.showButtons(button);
        this.formView.onClickAddNovo = () => this.onClickAddNovo();
        this.formView.onClickCancelar = () => this.onClickCancelar();
    }

    public getLocalUrl(): string {
        return window.location.hash.substring(2);
    }

    public showButtons(button: string): boolean {
        return true;
    }

    public showFooter(): boolean {
        return true;
    }

    protected override getFormBaseToDisable(): any {
        return (this.formView.formBase.first as any).formBase.first.nativeElement;
    }

    public async onClickAddNovo(): Promise<void> {
        this.router.navigate([`${this.service.path}/novo`], { replaceUrl: false });
    }

    public async onClickCancelar(): Promise<void> {
        this.blockForm();
        await this.onCancel();
    }

    protected async onCancel(): Promise<void> {
        this.router.navigate(['inicio'], { replaceUrl: false });
    }

}
