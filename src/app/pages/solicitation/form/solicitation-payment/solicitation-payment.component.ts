import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { getRolesColor, getRolesTranslation, Roles } from '../../../../core/enums/roles.enum';
import { DialogType } from '../../../../core/services/dialog.service';
import { Equipment } from '../../../cadastros/equipment/model/equipment.model';
import { User } from '../../../cadastros/user/model/user.model';
import { UserService } from '../../../cadastros/user/user.service';
import { FinanceiroService } from '../../../financeiro/financeiro.service';
import { Finance } from '../../../financeiro/model/finance.model';
import { FinanceDetails } from '../../../financeiro/model/financedetails.model';
import { Solicitation } from '../../model/solicitation.model';
import { SolicitationService } from '../../solicitation.service';

export class EquipmentPrices {
    id: number;
    name: string;
    calculateByHours?: boolean = false;
    hourPrice?: number = 0;
    samplePrice?: number = 0;
    hoursTotal?: number = 0;
    sampleTotal?: number = 0;

    get total(): number {
        return this.calculateByHours
            ? this.hoursTotal * this.hourPrice
            : this.sampleTotal * this.samplePrice;
    }
}

@Component({
    selector: 'solicitation-payment',
    templateUrl: './solicitation-payment.component.html',
    styleUrl: './solicitation-payment.component.scss'
})
export class SolicitationPaymentComponent extends FormCrud<Solicitation> {

    @ViewChild('formView') public formView: FormCrudComponent;
    @Output() onChangeComplete: EventEmitter<boolean> = new EventEmitter();

    @Input() set solicitacao(value: Solicitation) {
        this.object = value;
        if (value) {
            this.responsavel_pagamento = this.convertUtilsService.cloneObject(value.responsavel);
            let userType = 'Utfpr';
            if (value.responsavel.role == Roles.ROLE_EXTERNAL) {
                userType = 'External';
            } else if (value.responsavel.role == Roles.ROLE_PARTNER) {
                userType = 'Partner';
            }

            this.equipmentPrices = new Map();
            value.form.amostras.forEach(amostra => {
                amostra.analises.forEach(analise => {
                    if (analise.equipment) {
                        const equipmentPrice = this.equipmentPrices.get(analise.equipment.id);
                        if (analise.dataini && analise.datafin) {
                            const seconds = (analise.datafin.getTime() - analise.dataini.getTime()) / 1000;
                            const hours = seconds / 3600;
                            if (equipmentPrice) {
                                equipmentPrice.hoursTotal += hours;
                                equipmentPrice.sampleTotal++;
                            } else {
                                const value = new EquipmentPrices();
                                value.id = analise.equipment.id;
                                value.name = analise.equipment.name;
                                value.hourPrice = analise.equipment['valueHour' + userType] || 0;
                                value.samplePrice = analise.equipment['valueSample' + userType] || 0;
                                value.hoursTotal = hours;
                                value.sampleTotal = 1;
                                value.calculateByHours = value.total == 0;
                                this.equipmentPrices.set(analise.equipment.id, value);
                            }
                        }
                    }
                });
            });
        }
    }

    public possiveisPagadores: User[] = [];
    public responsavel_pagamento: User = null;
    public equipmentPrices: Map<number, EquipmentPrices> = new Map();
    public get equipmentPricesList(): EquipmentPrices[] {
        return Array.from(this.equipmentPrices.values());
    }

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitationService,
        protected readonly userService: UserService,
        protected readonly financeService: FinanceiroService,
    ) {
        super(injector, service);
        this.userService.findAll().then(async data => {
            this.possiveisPagadores = data;
        });
    }

    public changeAllPagamentos(): void {
        let firstValue: boolean = null;
        for (const value of this.equipmentPrices.values()) {
            if (firstValue == null) {
                firstValue = !value.calculateByHours;
            }
            value.calculateByHours = firstValue;
        }
    }

    public getTotalValores(): number {
        let total = 0;
        this.equipmentPrices.forEach(value => {
            total += value.total;
        });
        return total;
    }

    public override showButtons(button: string): boolean {
        return ['salvar', 'cancelar'].includes(button);
    }

    public override showHeader(): boolean {
        return false;
    }

    public override getObjectIdFromUrl(): number {
        return null;
    }

    public override async onClickCancelar(): Promise<void> {
        this.onChangeComplete.emit(false);
    }

    public getRolesTranslation(role: Roles): string {
        return getRolesTranslation(role);
    }

    public getRolesColor(role: Roles): string {
        return getRolesColor(role);
    }

    public override async onSave(object: any): Promise<void> {
        object = this.convertUtilsService.cloneObject(this.solicitacao);
        if (this.validateForm()) {
            if (this.equipmentPricesList.find(it => it.total == 0)) {
                const sweetAlertOptions: SweetAlertOptions = {
                    title: 'Atenção',
                    html: `Existem valores com <strong class="text-danger">Total: R$ 0,00</strong><br>Deseja continuar com o processo?`,
                    icon: DialogType.QUESTION,
                    focusConfirm: false,
                    focusCancel: true,
                    showConfirmButton: true,
                    confirmButtonColor: '#0dcaf0',
                    confirmButtonText: 'Sim',
                    showCancelButton: true,
                    cancelButtonColor: '#ccc',
                    cancelButtonText: 'Cancelar',
                };

                Swal.mixin(sweetAlertOptions).fire().then(async (result) => {
                    if (result.isConfirmed) {
                        this.concluirSave(object);
                    }
                });
            } else {
                this.concluirSave(object);
            }
        }
    }

    private async concluirSave(object: Solicitation): Promise<void> {
        this.blockForm();

        const financeiro: Finance = new Finance();
        financeiro.state = 'PENDING';
        financeiro.responsavel = this.object.responsavel;
        financeiro.pagador = this.responsavel_pagamento;
        financeiro.value = this.getTotalValores();
        financeiro.solicitation = this.object;
        financeiro.description = 'Formulário nº ' + this.object.id;

        const details: FinanceDetails[] = [];
        for (const value of this.equipmentPrices.values()) {
            const detail = new FinanceDetails();
            detail.equipment = new Equipment();
            detail.equipment.id = value.id;
            detail.calculateByHours = value.calculateByHours;
            detail.quantity = value.calculateByHours ? value.hoursTotal : value.sampleTotal;
            detail.value = value.total;
            details.push(detail);
        }
        financeiro.details = details;

        this.financeService.save(financeiro).then(async (data) => {
            this.toastrService.showSuccess(this.title, 'Registro salvo com sucesso!');
            this.onChangeComplete.emit(true);
        }, error => {
            if (this.hasErrorMapped(error)) {
                this.errorHandler(error);
            } else {
                this.toastrService.showError(this.title, 'Erro ao salvar Registro!');
            }
        }).finally(() => this.releaseForm());
    }

}
