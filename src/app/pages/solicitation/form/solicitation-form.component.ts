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
import { WebsocketService } from './../../../core/services/websocket.service';


@Component({
    selector: 'SolicitationFormComponent',
    templateUrl: './solicitation-form.component.html',
    styleUrl: './solicitation-form.component.scss',
})
export class SolicitationFormComponent extends FormCrud<Solicitation> {

    @ViewChild('formView') public formView: FormCrudComponent;
    @ViewChild('tiredMenu') tiredMenu: TieredMenu;

    public readonly status_AWAITING_CORRECTION = getSolicitationStatusEnum(SolicitationStatus.AWAITING_CORRECTION);
    public readonly status_AWAITING_PAYMENT = getSolicitationStatusEnum(SolicitationStatus.AWAITING_PAYMENT);
    public readonly status_REJECTED = getSolicitationStatusEnum(SolicitationStatus.REJECTED);
    public readonly status_COMPLETED = getSolicitationStatusEnum(SolicitationStatus.COMPLETED);

    public isResponsavel: boolean = false;
    public historico: SolicitationHistoric[] = []
    private mappedColors: Map<string, string> = new Map();

    public activeTabIndex: number = 0;

    public changeStatusItens: MenuItem[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitationService,
        protected readonly dialogService: DialogService,
        protected readonly ws: WebsocketService,
    ) {
        super(injector, service);
        this.subscriptions.push(
            this.ws.solicitacaoRecebida$.subscribe((solicitation: Solicitation) => {
                this.service.findOne(solicitation.id).then(data => this.updateObject(solicitation));
            })
        );
    }

    public override showHeader(): boolean {
        return false;
    }

    public override showButtons(button: string): boolean {
        const buttons: string[] = ['cancelar'];
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
        this.isResponsavel = this.object.responsavel.id == this.authentication.getUserLogged().id;
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
        if (!this.isAdmin && !this.isResponsavel) {
            return;
        }

        const statusTraducao = getEnumTranslation('SolicitationStatus', this.object.status);
        this.changeStatusItens = [];

        if ((this.isResponsavel || this.isAdmin) && this.object.status == SolicitationStatus.AWAITING_RESPONSIBLE_CONFIRMATION) {
            this.changeStatusItens.push(this.createButtonGeneric('Autorizar', 'fa fa-check', 'text-success', SolicitationStatus.AWAITING_LAB_CONFIRMATION));
            this.changeStatusItens.push(this.createButtonCorrecao());
            this.changeStatusItens.push(this.createButtonRecusar());
        } else if (this.isAdmin) {
            switch (statusTraducao) {
                case SolicitationStatus.AWAITING_LAB_CONFIRMATION:
                    this.changeStatusItens.push(this.createButtonGeneric('Solicitar Amostra', 'fa fa-flask', 'text-success', SolicitationStatus.AWAITING_SAMPLE));
                    this.changeStatusItens.push(this.createButtonGeneric('Aguardando Análise', 'fa fa-vial-circle-check', 'text-info', SolicitationStatus.AWAITING_ANALYSIS, [SolicitationStatus.AWAITING_SAMPLE]));
                    this.changeStatusItens.push(this.createButtonGeneric('Analisando', 'fa fa-flask-gear', 'text-info', SolicitationStatus.ANALYZING, [SolicitationStatus.AWAITING_SAMPLE, SolicitationStatus.AWAITING_ANALYSIS]));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonCorrecao());
                    this.changeStatusItens.push(this.createButtonRecusar());
                    break;
                case SolicitationStatus.AWAITING_SAMPLE:
                    this.changeStatusItens.push(this.createButtonGeneric('Aguardando Análise', 'fa fa-vial-circle-check', 'text-success', SolicitationStatus.AWAITING_ANALYSIS));
                    this.changeStatusItens.push(this.createButtonGeneric('Analisando', 'fa fa-flask-gear', 'text-info', SolicitationStatus.ANALYZING, [SolicitationStatus.AWAITING_ANALYSIS]));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonCorrecao());
                    this.changeStatusItens.push(this.createButtonRecusar());
                    break;
                case SolicitationStatus.AWAITING_ANALYSIS:
                    this.changeStatusItens.push(this.createButtonGeneric('Analisando', 'fa fa-flask-gear', 'text-success', SolicitationStatus.ANALYZING));
                    this.changeStatusItens.push(this.createButtonGeneric('Solicitar nova Amostra', 'fa fa-vial-virus', 'text-warning', SolicitationStatus.AWAITING_SAMPLE));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonRecusar());
                    break;
                case SolicitationStatus.ANALYZING:
                    this.changeStatusItens.push(this.createButtonGeneric('Concluir', 'fa fa-dollar-sign', 'text-success', SolicitationStatus.AWAITING_PAYMENT));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonGeneric('Solicitar nova Amostra', 'fa fa-vial-virus', 'text-warning', SolicitationStatus.AWAITING_SAMPLE, [SolicitationStatus.TECHNICAL_BREAK]));
                    this.changeStatusItens.push(this.createButtonGeneric('Pausa Técnica', 'fa fa-pause', 'text-warning', SolicitationStatus.TECHNICAL_BREAK));
                    this.changeStatusItens.push(this.createButtonGeneric('Bloqueio Imprevisto', 'fa fa-road-barrier', 'text-danger', SolicitationStatus.UNEXPECTED_BLOCK));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonRecusar());
                    break;
                case SolicitationStatus.UNEXPECTED_BLOCK:
                    this.changeStatusItens.push(this.createButtonGeneric('Retomar análise', 'fa fa-flask-gear', 'text-success', SolicitationStatus.ANALYZING));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonRecusar());
                    break;
                case SolicitationStatus.TECHNICAL_BREAK:
                    this.changeStatusItens.push(this.createButtonGeneric('Retomar análise', 'fa fa-flask-gear', 'text-success', SolicitationStatus.ANALYZING));
                    this.changeStatusItens.push(this.createButtonGeneric('Solicitar nova Amostra', 'fa fa-vial-virus', 'text-warning', SolicitationStatus.AWAITING_SAMPLE));
                    this.changeStatusItens.push(this.createButtonGeneric('Bloqueio Imprevisto', 'fa fa-road-barrier', 'text-danger', SolicitationStatus.UNEXPECTED_BLOCK));
                    this.changeStatusItens.push(this.createSeparator());
                    this.changeStatusItens.push(this.createButtonRecusar());
                    break;
            }
        }
    }

    private dialogAction(newStatus: SolicitationStatus, statusExtras?: SolicitationStatus[]): void {
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

        Swal.mixin(sweetAlertOptions).fire().then(async (result) => {
            if (result.isConfirmed) {
                try {
                    this.blockForm();
                    if (ObjectUtils.isNotEmpty(statusExtras)) {
                        for (const statusExtra of statusExtras) {
                            await this.enviarAtualizacaoStatus(null, statusExtra, true);
                        }
                        await this.enviarAtualizacaoStatus(result.value, newStatus);
                    } else {
                        await this.enviarAtualizacaoStatus(result.value, newStatus);
                    }
                } finally {
                    this.releaseForm();
                }
            }
        });
    }

    private async enviarAtualizacaoStatus(observacao: string, newStatus: SolicitationStatus, ignoreFeedbackMessage: boolean = false): Promise<void> {
        const status: SolicitationHistoric = new SolicitationHistoric();
        if (ObjectUtils.isNotEmpty(observacao)) {
            status.observation = observacao;
        }

        status.status = getSolicitationStatusEnum(newStatus);
        status.solicitation = this.object;

        this.blockForm();
        return this.service.atualizarStatus(status).then((data) => {
            // this.updateObject(data);
            if (!ignoreFeedbackMessage) {
                this.toastrService.showSuccess(this.title, 'Status atualizado com sucesso!');
            }
        }, error => {
            if (!ignoreFeedbackMessage) {
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.title, 'Erro ao atualziar status!');
                }
            }
        }).finally(() => this.releaseForm());
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

    private createButtonGeneric(label: string, icon: string, iconClass: string, status: SolicitationStatus, statusExtra?: SolicitationStatus[]): MenuItem {
        return {
            label: label,
            icon: icon,
            iconClass: iconClass,
            command: () => {
                this.dialogAction(status, statusExtra);
            },
        };
    }
    private createSeparator(): MenuItem {
        return {
            separator: true
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
                    // this.updateObject(data);
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
