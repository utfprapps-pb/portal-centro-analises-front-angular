import 'reflect-metadata';

import { AfterViewInit, Injectable, Injector } from '@angular/core';

import { Constants } from '../../core/constants/constants';
import { StorageManager } from '../../core/managers/storage-manager';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { DatatableComponent } from '../datatable/datatable/datatable.component';
import { FormBase } from '../form-base/form-base';
import { FormListComponent } from './form-list.component';

@Injectable()
export abstract class FormList<T extends ZModel> extends FormBase implements AfterViewInit {

    public abstract override formView: FormListComponent<T>;
    public abstract formViewDatatable: DatatableComponent;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: GenericCrudService<T>,
    ) {
        super(injector, service)
    }

    public ngAfterViewInit(): void {
        this.bindMethods();
    }

    private async bindMethods(): Promise<void> {
        if (this.formView == undefined) {
            setTimeout(async () => {
                await this.bindMethods();
            }, 500);
            return;
        }
        this.formView.showFooter = () => this.showFooter();
        this.formView.showButtons = (button: string) => this.showButtons(button);
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

    public async onClickCancelar(): Promise<void> {
        this.blockForm();
        setTimeout(() => {
            this.onCancel();
        }, 200);
    }

    protected onCancel() {
        if (StorageManager.has(Constants.LAST_PAGE)) {
            this.router.navigate([StorageManager.getItem(Constants.LAST_PAGE)], { replaceUrl: false });
        } else {
            this.router.navigate(['inicio'], { replaceUrl: false });
        }
    }

}
