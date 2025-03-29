import { Component, Injector, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabViewChangeEvent } from 'primeng/tabview';
import { TieredMenu } from 'primeng/tieredmenu';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { getEnumColor, getEnumTranslation } from '../../../core/enums/enum-mapper';
import { Dialog, DialogService, DialogType } from '../../../core/services/dialog.service';
import { ObjectUtils } from '../../../utils/object-utils';
import { SolicitationHistoric } from '../model/solicitation-historic.model';
import { Solicitation } from '../model/solicitation.model';
import { SolicitationService } from '../solicitation.service';
import { getSolicitationStatusEnum, SolicitationStatus } from './../../../core/enums/solicitation-status.enum';


@Component({
    selector: 'SolicitationFormComponent',
    templateUrl: './solicitation-form.component.html',
    styleUrl: './solicitation-form.component.scss',
})
export class SolicitationFormComponent extends FormCrud<Solicitation> {

    @ViewChild('formView') public formView: FormCrudComponent;
    @ViewChild('tiredMenu') tiredMenu: TieredMenu;

    public readonly status_AWAITING_CORRECTION = getSolicitationStatusEnum(SolicitationStatus.AWAITING_CORRECTION);

    public historico: SolicitationHistoric[] = []
    private mappedColors: Map<string, string> = new Map();

    public activeTabIndex: number = 0;

    public changeStatusItens: MenuItem[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitationService,
        protected readonly dialogService: DialogService,
    ) {
        super(injector, service);
    }

    public override showHeader(): boolean {
        return false;
    }

    public override showButtons(button: string): boolean {
        const buttons: string[] = ['cancelar'];
        if ([SolicitationStatus.AWAITING_RESPONSIBLE_CONFIRMATION,
        SolicitationStatus.AWAITING_LAB_CONFIRMATION]
            .includes(this.object.status)) {
            // buttons.push('excluir')
        }
        return buttons.includes(button);
    }

    private updateObject(newObject: Solicitation): void {
        this.object = newObject;
        this.onAfterLoadObject(this.object);
    }

    public override async onAfterLoadObject(object: Solicitation): Promise<void> {
        this.blockForm();
        this.service.buscarHistoricoById(object.id).then(data => {
            data.sort((a, b) => a.id - b.id);
            this.historico = data;
        }).finally(() => this.releaseForm());
        this.criarOpcoesMenu();
    }

    public getEnumColor(value: string): string {
        if (!this.mappedColors.has(value)) {
            this.mappedColors.set(value, getEnumColor('SolicitationStatus', value))
        }
        return this.mappedColors.get(value);
    }

    public onChangeTab(event: TabViewChangeEvent): void {
        this.activeTabIndex = event.index;
    }

    private criarOpcoesMenu(): void {
        const statusTraducao = getEnumTranslation('SolicitationStatus', this.object.status);
        this.changeStatusItens = [];
        switch (statusTraducao) {
            case SolicitationStatus.AWAITING_RESPONSIBLE_CONFIRMATION:
                this.changeStatusItens.push(this.createButtonAutorizar(SolicitationStatus.AWAITING_LAB_CONFIRMATION));
                this.changeStatusItens.push(this.createButtonCorrecao());
                this.changeStatusItens.push(this.createButtonRecusar());
                break;
            case SolicitationStatus.AWAITING_LAB_CONFIRMATION:
                if (this.isAdmin) {
                    this.changeStatusItens.push(this.createButtonAutorizar(SolicitationStatus.AWAITING_SAMPLE));
                    this.changeStatusItens.push(this.createButtonCorrecao());
                    this.changeStatusItens.push(this.createButtonRecusar());
                }
                break;
            // case SolicitationStatus.AWAITING_SAMPLE:
            //     break;
            // case SolicitationStatus.AWAITING_ANALYSIS:
            //     break;
            // case SolicitationStatus.ANALYZING:
            //     break;
            // case SolicitationStatus.AWAITING_PAYMENT:
            //     break;
            // case SolicitationStatus.REJECTED:
            //     break;
            // case SolicitationStatus.COMPLETED:
            //     break;
            // case SolicitationStatus.UNEXPECTED_BLOCK:
            //     break;
            // case SolicitationStatus.TECHNICAL_BREAK:
            //     break;
        }
    }

    private dialogAction(newStatus: SolicitationStatus): void {
        const sweetAlertOptions: SweetAlertOptions = {
            title: 'Atenção',
            html: `Deseja realmente alterar o status da solicitação para <b>${newStatus}</b>?`,
            icon: DialogType.QUESTION,
            focusConfirm: false,
            focusCancel: true,
            showConfirmButton: true,
            confirmButtonColor: '#0dcaf0',
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonColor: '#ccc',
            cancelButtonText: 'Cancelar',
            input: 'textarea',
            inputPlaceholder: 'Observação',
            preConfirm: this.changeStatusInputValidator.bind(this, newStatus)
        };

        Swal.mixin(sweetAlertOptions).fire().then((result) => {
            if (result.isConfirmed) {
                const status: SolicitationHistoric = new SolicitationHistoric();
                if (ObjectUtils.isNotEmpty(result.value)) {
                    status.observation = result.value;
                }

                status.status = getSolicitationStatusEnum(newStatus);
                status.solicitation = this.object;

                this.blockForm();
                this.service.atualizarStatus(status).then((data) => {
                    this.updateObject(data);
                    this.toastrService.showSuccess(this.title, 'Status atualizado com sucesso!');
                }, error => {
                    if (this.hasErrorMapped(error)) {
                        this.errorHandler(error);
                    } else {
                        this.toastrService.showError(this.title, 'Erro ao atualziar status!');
                    }
                }).finally(() => this.releaseForm());
            }
        });
    }
    private changeStatusInputValidator(newStatus: SolicitationStatus, value: string): any {
        const recusadoTexto = SolicitationStatus.REJECTED;
        const corrigirTexto = SolicitationStatus.AWAITING_CORRECTION;
        const bloqueioTexto = SolicitationStatus.UNEXPECTED_BLOCK;
        const pausaTexto = SolicitationStatus.TECHNICAL_BREAK;

        if ([recusadoTexto, corrigirTexto, bloqueioTexto, pausaTexto].includes(newStatus) && ObjectUtils.isEmpty(value)) {
            return Swal.showValidationMessage('Por favor, preencha o campo de Observação.');
        }
        return value;
    }

    private createButtonAutorizar(status: SolicitationStatus): MenuItem {
        return {
            label: 'Autorizar',
            icon: 'fa fa-check',
            iconClass: 'text-success',
            command: () => {
                this.dialogAction(SolicitationStatus.AWAITING_LAB_CONFIRMATION);
            },
        };
    }

    private createButtonCorrecao(): MenuItem {
        return {
            label: 'Necessário Correção',
            icon: 'fa fa-pencil-alt',
            iconClass: 'text-warning',
            command: () => {
                this.dialogAction(SolicitationStatus.AWAITING_CORRECTION);
            },
        };
    }

    private createButtonRecusar(): MenuItem {
        return {
            label: 'Recusar',
            icon: 'fa fa-times',
            iconClass: 'text-danger',
            command: () => {
                this.dialogAction(SolicitationStatus.REJECTED);
            },
        };
    }

    public onClickEnviarCorrecao(): void {
        const sweetAlertOptions: Dialog = new Dialog();
        sweetAlertOptions.title = 'Atenção';
        sweetAlertOptions.message = `Deseja realmente enviar a correção atual?`;
        sweetAlertOptions.showDenyButton = false;
        sweetAlertOptions.type = DialogType.QUESTION;
        this.dialogService.open(sweetAlertOptions).then(data => {
            if (data) {
                this.blockForm();
                this.service.save(this.object).then((data) => {
                    this.updateObject(data);
                    this.toastrService.showSuccess(this.title, 'Correção enviada com sucesso!');
                }, error => {
                    if (this.hasErrorMapped(error)) {
                        this.errorHandler(error);
                    } else {
                        this.toastrService.showError(this.title, 'Erro ao enviar correção!');
                    }
                }).finally(() => this.releaseForm());
            }
        });
    }
}
