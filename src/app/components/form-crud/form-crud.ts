import { AfterViewInit, Injectable, Injector } from '@angular/core';

import { Constants } from '../../core/constants/constants';
import { StorageManager } from '../../core/managers/storage-manager';
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
        this.formView.showFooter = () => this.showFooter();
        this.formView.showButtons = (button) => this.showButtons(button);
        this.formView.exitOnSave = () => this.exitOnSave();

        this.formView.onClickSalvar = () => this.onClickSalvar();
        this.formView.onClickCancelar = () => this.onClickCancelar();

        this.formView.onBeforeSave = (object) => this.onBeforeSave(object);
        this.formView.onSave = (object) => this.onSave(object);
        this.formView.onAfterSave = (object) => this.onAfterSave(object);
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

    protected exitOnSave(): boolean {
        return true;
    }

    public async onClickSalvar(): Promise<void> {
        const object = this.object;
        this.onSave(object)
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

    protected async onBeforeSave(object: any): Promise<void> { }

    protected async onSave(object: any): Promise<void> {
        if (this.validateForm()) {
            this.blockForm();
            await this.onBeforeSave(object);
            this.service.save(object).then(async (data) => {
                await this.onAfterSave(object);
                this.toastrService.showSuccess(this.pageTitle, 'Registro salvo com sucesso!');
                this.releaseForm();
                if (this.exitOnSave()) {
                    this.onCancel();
                }
            }, error => {
                this.releaseForm();
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.pageTitle, 'Erro ao salvar Registro!');
                }
            });
        }
    }

    protected async onAfterSave(object: any): Promise<void> { }

}
