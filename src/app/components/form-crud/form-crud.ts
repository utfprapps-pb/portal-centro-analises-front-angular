import { AfterContentInit, Injectable, Injector, OnInit } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

import { Constants } from '../../core/constants/constants';
import { StorageManager } from '../../core/managers/storage-manager';
import { Dialog, DialogType } from '../../core/services/dialog.service';
import { GenericCrudService } from '../../generics/generic-crud.service';
import { ZModel } from '../../generics/zmodel';
import { FormBase } from '../form-base/form-base';
import { FormCrudComponent } from './form-crud.component';

@Injectable()
export abstract class FormCrud<T extends ZModel> extends FormBase implements OnInit, AfterContentInit {

    public abstract override formView: FormCrudComponent;

    public object: T;
    private buscouObjeto: boolean = false;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: GenericCrudService<T>,
    ) {
        super(injector, service)
        this.object = this.service.createInstance();
    }

    public ngOnInit(): void {
        this.formComplete();
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
        this.formView.objectUpdating = () => this.objectUpdating();

        this.formView.showHeader = () => this.showHeader();
        this.formView.showFooter = () => this.showFooter();
        this.formView.showButtons = (button) => this.showButtons(button);
        this.formView.exitOnSave = () => this.exitOnSave();

        this.formView.onClickSalvar = () => this.onClickSalvar();
        this.formView.onClickCancelar = () => this.onClickCancelar();
        this.formView.onClickExcluir = () => this.onClickExcluir();

        this.formView.onBeforeSave = (object) => this.onBeforeSave(object);
        this.formView.onSave = (object) => this.onSave(object);
        this.formView.onAfterSave = (object) => this.onAfterSave(object, null);

        this.formView.onExcluir = (object) => this.onExcluir(object);
    }

    private async formComplete(): Promise<void> {
        this.blockForm();
        const id = this.getObjectIdFromUrl();
        if (id != null) {
            await this.service.findOne(id).then(async (data: any) => {
                this.onLoadObject(data);
                this.object = data;
                await this.onAfterLoadObject(this.object);
            }, error => {
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.title, 'Erro ao carregar Registro!');
                    this.onCancel();
                }
            }).finally(() => {
                this.releaseForm();
            });
        } else {
            this.onAfterLoadObject(this.object);
        }
    }

    public onLoadObject(object: T): void {

    }

    public async onAfterLoadObject(object: T): Promise<void> {
        this.buscouObjeto = true;
    }

    public async onAfterFormComplete(object: T): Promise<void> {

    }

    public getLocalUrl(): string {
        return location.hash.substring(2);
    }

    public getObjectIdFromUrl(): number {
        const url: string = this.getLocalUrl();
        if (url.includes('/alterar')) {
            return this.urlSubstringKey(url, '/alterar/') as undefined as number;
        }
        return null;
    }

    private urlSubstringKey(url: string, key: string): string {
        if (url.includes(key)) {
            return url.substring(url.indexOf(key) + key.length);
        } else {
            return url;
        }
    }

    public showButtons(button: string): boolean {
        return true;
    }

    public showHeader(): boolean {
        return true;
    }

    public showFooter(): boolean {
        return true;
    }

    protected objectUpdating(): boolean {
        return ObjectUtils.isNotEmpty(this.object) && ObjectUtils.isNotEmpty(this.object.id);
    }

    protected override getFormBaseToDisable(): any {
        return (this.formView.formBase.first as any).formBase.first.nativeElement;
    }

    protected exitOnSave(): boolean {
        return true;
    }

    public async onClickCancelar(): Promise<void> {
        this.blockForm();
        this.onCancel();
    }

    protected onCancel() {
        let localRedirect = false;
        let index = 0;
        const hash = location.hash.substring(1);
        if (hash.includes('/alterar') || hash.includes('/novo')) {
            localRedirect = true;
            if (hash.includes('/alterar')) {
                index = hash.indexOf('/alterar');
            }
            if (hash.includes('/novo')) {
                index = hash.indexOf('/novo');
            }
        }

        if (localRedirect) {
            this.router.navigate([hash.substring(0, index)], { replaceUrl: false });
        } else {
            if (StorageManager.has(Constants.LAST_PAGE)) {
                this.router.navigate([StorageManager.getItem(Constants.LAST_PAGE)], { replaceUrl: false });
            } else {
                this.router.navigate(['inicio'], { replaceUrl: false });
            }
        }
    }

    public async onClickSalvar(): Promise<void> {
        const object = this.object;
        this.onSave(object)
    }

    protected async onBeforeSave(object: any): Promise<void> { }

    protected async onSave(object: any): Promise<void> {
        if (this.validateForm()) {
            this.blockForm();
            await this.onBeforeSave(object);
            this.service.save(object).then(async (data) => {
                await this.onAfterSave(object, data);
                this.toastrService.showSuccess(this.title, 'Registro salvo com sucesso!');
                if (this.exitOnSave()) {
                    this.onCancel();
                }
            }, error => {
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.title, 'Erro ao salvar Registro!');
                }
            }).finally(() => {
                this.releaseForm();
            });
        }
    }

    protected async onAfterSave(object: any, server: any): Promise<void> { }

    public async onClickExcluir(): Promise<void> {
        const object = this.object;
        this.onExcluir(object)
    }

    protected async onExcluir(object: any): Promise<void> {
        if (!!object.id) {
            const dialog: Dialog = new Dialog();
            dialog.type = DialogType.QUESTION;
            dialog.title = "Você tem certeza que deseja excluir este registro?"
            dialog.html = `<b class="text-danger">A operação não pode ser desfeita!</b>`

            await this.dialogService.open(dialog).then(async (canDelete) => {
                if (canDelete) {
                    this.blockForm();
                    await this.service.delete(object.id).then(async () => {
                        this.toastrService.showSuccess(this.title, 'Registro excluido com sucesso!');
                        if (this.exitOnSave()) {
                            this.onCancel();
                        }
                    }, error => {
                        if (this.hasErrorMapped(error)) {
                            this.errorHandler(error);
                        } else {
                            this.toastrService.showError(this.title, 'Erro ao excluir Registro!');
                        }
                    }).finally(() => {
                        this.releaseForm();
                    });
                }
            });
        }
    }
}
