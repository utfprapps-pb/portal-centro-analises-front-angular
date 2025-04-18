import { AfterViewInit, Component, forwardRef, inject, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Accordion } from 'primeng/accordion';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { Debounce } from '../../../core/decorators/decorators';
import { CompCtrlDirective } from '../../../core/directives/compctrl/compctrl.directive';
import { Roles } from '../../../core/enums/roles.enum';
import { SolicitationFormType } from '../../../core/enums/solicitation-form-type.enum';
import { getSolicitationStatusEnum, SolicitationStatus } from '../../../core/enums/solicitation-status.enum';
import { AuthService } from '../../../core/services/auth.service';
import { DialogType } from '../../../core/services/dialog.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { UserLoginDTO } from '../../../dtos/user-login-dto';
import { ConvertUtilsService } from '../../../utils/convert-utils.service';
import { Stack } from '../../../utils/models/stack';
import { ObjectUtils } from '../../../utils/object-utils';
import { EquipmentService } from '../../cadastros/equipment/equipment.service';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from '../../project/model/project.model';
import { ProjectService } from '../../project/project.service';
import { SolicitationAmostraAnalise } from '../../solicitation/model/solicitation-amostra-analise.model';
import { SolicitationAmostraFoto } from '../../solicitation/model/solicitation-amostra-foto.model';
import { SolicitationAmostra } from '../../solicitation/model/solicitation-amostra.model';
import { Solicitation } from '../../solicitation/model/solicitation.model';
import { SolicitationService } from '../../solicitation/solicitation.service';

@Component({
    selector: 'solicitar-formulario-template',
    templateUrl: './solicitar-formulario-template.component.html',
    styleUrl: './solicitar-formulario-template.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SolicitarFormularioTemplateComponent),
            multi: true
        }
    ],
})
export class SolicitarFormularioTemplateComponent implements ControlValueAccessor, AfterViewInit {

    @ViewChildren(CompCtrlDirective) componentes: QueryList<CompCtrlDirective>;
    @ViewChild('accordion') accordion: Accordion;
    @Input('disabled') disableForm: boolean = false;
    @Input('openAll') openAll: boolean = true;

    public facades: Stack<number> = new Stack();

    public activeIndexAmostras: number[] = [];

    private _innerObject: Solicitation;
    set object(value: Solicitation) {
        this._innerObject = value;
        if (ObjectUtils.isNotEmpty(value)) {
            this.responsavel = value.responsavel;
            if (this.uniqueProject) {
                this.onChangeProject(this.uniqueProject);
            }
            if (this.openAll) {
                this.openAllAccordions();
            }
            if (ObjectUtils.isNotEmpty(value) && ObjectUtils.isNotEmpty(value.id)) {
                this.habilitarChanges = false;
            }

            this.equipmentService.findAll().then(async data => {
                data.sort((a, b) => a.id - b.id);
                if (!this.habilitarChanges) {
                    this.equipamentosDisponiveis = data.filter(it => it.analise == null);
                }
                this.equipamentos = data;
            });
        }
    }
    get object(): Solicitation {
        return this._innerObject;
    }

    public readonly OPCAO_OUTRO: any = 'OTHER';
    public readonly NATUREZA_ORGANICA_ORGANICA: any = 'ORG';
    public readonly NATUREZA_ORGANICA_INORGANICA: any = 'INO';

    public readonly BOOLEAN_TRUE: any = 'TRUE';
    public readonly BOOLEAN_FALSE: any = 'FALSE';

    public readonly MODO_ANALISE_CN: any = 'CN';
    public readonly MODO_ANALISE_ST: any = 'ST';

    public readonly MODO_ELUICAO_ISO: any = 'ISO';
    public readonly MODO_ELUICAO_GRA: any = 'GRA';

    public readonly status_ANALYZING = getSolicitationStatusEnum(SolicitationStatus.ANALYZING);

    private uniqueProject: Project = null;
    public projetos: Project[] = [];
    public equipamentos: Equipment[] = [];
    public equipamentosDisponiveis: Equipment[] = [];

    public responsavel: UserLoginDTO = null;

    private lastSolicitationType: SolicitationFormType = null;

    private habilitarChanges: boolean = true;

    private authentication: AuthService = inject(AuthService);
    private projectService: ProjectService = inject(ProjectService);
    private equipmentService: EquipmentService = inject(EquipmentService);
    private convertUtilsService: ConvertUtilsService = inject(ConvertUtilsService);
    private solicitationService: SolicitationService = inject(SolicitationService);
    private toastrService: ToastrService = inject(ToastrService);

    public isAdmin: boolean = false;

    constructor() {
        this.projectService.findAllSelf().then(async data => {
            this.projetos = data;
            if (data.length == 1) {
                this.uniqueProject = data[0];
            }
        });

        this.isAdmin = Roles.ROLE_ADMIN == this.authentication.getUserLogged()?.role;
    }

    public blockForm(): void {
        this.facades.push(this.facades.size());
    }

    public releaseForm(force: boolean = false): boolean {
        if (force) {
            this.facades.clear();
        } else {
            this.facades.pop();
        }
        return this.facades.isEmpty();
    }

    public openAllAccordions(): void {
        this.activeIndexAmostras = [];
        if (ObjectUtils.isNotEmpty(this.object.form?.amostras)) {
            for (let i = 0; i < this.object.form.amostras.length; i++) {
                this.activeIndexAmostras.push(i);
            }
            if (ObjectUtils.isNotEmpty(this.activeIndexAmostras)) {
                this.accordion.activeIndex = this.activeIndexAmostras;
            }
        }
    }

    public ngAfterViewInit(): void {
        this.componentes.changes.subscribe((comp: QueryList<CompCtrlDirective>) => {
            this.desabilitarFormulario(comp.toArray());
        });

        this.desabilitarFormulario(this.componentes.toArray());
    }

    public desabilitarFormulario(componentes: CompCtrlDirective[]) {
        if (this.disableForm) {
            componentes.forEach((comp) => {
                comp.setInternalDisabled(true);
            });
        }
    }

    public objectUpdating(): boolean {
        return ObjectUtils.isNotEmpty(this.object) && ObjectUtils.isNotEmpty(this.object.id);
    }

    @Debounce(100)
    public onChangeProject(project: Project): void {
        if (!this.habilitarChanges) return;
        if (this.uniqueProject && project == null) {
            project = this.uniqueProject;
        }

        this.object.responsavel = null;
        this.responsavel = this.authentication.getUserLogged();

        this.object.project = project;
        this.object.projectNature = project?.projectNature;
        this.object.otherProjectNature = project?.otherProjectNature;

        if (ObjectUtils.isNotEmpty(project)) {
            this.responsavel = project.user;
        }
        this.object.responsavel = new User();
        this.object.responsavel.id = this.responsavel.id;
    }

    public onChangeSolicitationType(): void {
        if (!this.habilitarChanges) return;
        if (this.lastSolicitationType == this.object.solicitationType) {
            return;
        }
        this.lastSolicitationType = this.object.solicitationType
        const preserve: string[] = ['retirada', 'citacao']
        for (const prop in this.object.form) {
            if (!preserve.includes(prop)) {
                delete this.object.form[prop];
            }
        }
        this.object.form.amostras = [];
        this.onClickAddAmostra();
    }

    public onChangeNaturezaAmostra(): void {
        if (!this.habilitarChanges) return;

        for (const amostra of this.object.form.amostras) {
            if (amostra.naturezaAmostra == "INO") {
                amostra.descarteOrganico = null;
                amostra.descarteOrganicoOutro = null;
            } else {
                amostra.descarteInorganico = null;
                amostra.descarteInorganicoOutro = null;
            }
        }
    }

    public onChangeDescarteOrganico(): void {
        if (!this.habilitarChanges) return;
        for (const amostra of this.object.form.amostras) {
            if (amostra.descarteOrganico != this.OPCAO_OUTRO) {
                amostra.descarteOrganicoOutro = null;
            }
        }
    }

    public onChangeDescarteInorganico(): void {
        if (!this.habilitarChanges) return;
        for (const amostra of this.object.form.amostras) {
            if (amostra.descarteInorganico != this.OPCAO_OUTRO) {
                amostra.descarteInorganicoOutro = null;
            }
        }
    }

    public onChangeDescarteUsuario(): void {
        if (!this.habilitarChanges) return;
        for (const amostra of this.object.form.amostras) {
            if (amostra.descarteOrganico != this.OPCAO_OUTRO) {
                amostra.descarteUsuarioOutro = null;
            }
        }
    }

    public onClickAddAmostra(): void {
        if (this.disableForm) return;
        const novaAmostra: SolicitationAmostra = new SolicitationAmostra();
        if (this.getSolicitationType() == 'MEV') {
            this.onClickAddFotoMev(novaAmostra);
        }
        this.object.form.amostras.push(novaAmostra);
        this.updateAmostraNumber();
    }

    public onClickRemoveAmostra(index: number): void {
        if (this.disableForm) return;
        this.object.form.amostras.splice(index, 1);
        this.updateAmostraNumber();
        if (ObjectUtils.isEmpty(this.object.form.amostras)) {
            this.onClickAddAmostra();
        }
    }

    private updateAmostraNumber(): void {
        this.object.amountSamples = this.object.form.amostras.length;
    }

    public getSolicitationType(): string {
        return this.object.solicitationType;
    }

    public onClickAddFotoMev(amostra: SolicitationAmostra): void {
        if (this.disableForm) return;
        if (ObjectUtils.isEmpty(amostra.fotos)) {
            amostra.fotos = [];
        }
        const foto: SolicitationAmostraFoto = new SolicitationAmostraFoto();
        amostra.fotos.push(foto);
    }

    public onClickRemoveFotoMev(amostra: SolicitationAmostra, index: number): void {
        if (this.disableForm) return;
        amostra.fotos.splice(index, 1);
        this.updateAmostraNumber();
        if (ObjectUtils.isEmpty(amostra.fotos)) {
            this.onClickAddFotoMev(amostra);
        }
    }

    public getBucketName(): string {
        return `${this.authentication.getUserLogged().id}`
    }

    public onClickReplicarDadosAmostras(index: number): void {
        if (this.disableForm) return;
        const origem: SolicitationAmostra = this.convertUtilsService.cloneObject(this.object.form.amostras[index]);

        for (let i = 0; i < this.object.form.amostras.length; i++) {
            if (i != index) {
                this.object.form.amostras[i].composicao = this.convertUtilsService.cloneObject(origem.composicao)
                this.object.form.amostras[i].toxic = this.convertUtilsService.cloneObject(origem.toxic)
                this.object.form.amostras[i].naturezaAmostra = this.convertUtilsService.cloneObject(origem.naturezaAmostra)
                this.object.form.amostras[i].descarteOrganico = this.convertUtilsService.cloneObject(origem.descarteOrganico)
                this.object.form.amostras[i].descarteOrganicoOutro = this.convertUtilsService.cloneObject(origem.descarteOrganicoOutro)
                this.object.form.amostras[i].descarteInorganico = this.convertUtilsService.cloneObject(origem.descarteInorganico)
                this.object.form.amostras[i].descarteInorganicoOutro = this.convertUtilsService.cloneObject(origem.descarteInorganicoOutro)
                this.object.form.amostras[i].descarteUsuario = this.convertUtilsService.cloneObject(origem.descarteUsuario)
                this.object.form.amostras[i].descarteUsuarioOutro = this.convertUtilsService.cloneObject(origem.descarteUsuarioOutro)

                // DRX
                this.object.form.amostras[i].faixaVarredura = this.convertUtilsService.cloneObject(origem.faixaVarredura)
                this.object.form.amostras[i].step = this.convertUtilsService.cloneObject(origem.step)
                this.object.form.amostras[i].velocidadeVarredura = this.convertUtilsService.cloneObject(origem.velocidadeVarredura)
                this.object.form.amostras[i].tempoPasso = this.convertUtilsService.cloneObject(origem.tempoPasso)

                // DSC - TGADTA
                this.object.form.amostras[i].expande = this.convertUtilsService.cloneObject(origem.expande)
                this.object.form.amostras[i].liberaGas = this.convertUtilsService.cloneObject(origem.liberaGas)
                this.object.form.amostras[i].gasLiberado = this.convertUtilsService.cloneObject(origem.gasLiberado)
                this.object.form.amostras[i].massa = this.convertUtilsService.cloneObject(origem.massa)
                this.object.form.amostras[i].tecnica = this.convertUtilsService.cloneObject(origem.tecnica)
                this.object.form.amostras[i].atmosfera = this.convertUtilsService.cloneObject(origem.atmosfera)
                this.object.form.amostras[i].fluxoGas = this.convertUtilsService.cloneObject(origem.fluxoGas)
                this.object.form.amostras[i].taxaAquecimento = this.convertUtilsService.cloneObject(origem.taxaAquecimento)
                this.object.form.amostras[i].intervaloTemperatura = this.convertUtilsService.cloneObject(origem.intervaloTemperatura)

                // MEV
                this.object.form.amostras[i].objetivo = this.convertUtilsService.cloneObject(origem.objetivo)
                this.object.form.amostras[i].fotos = this.convertUtilsService.cloneObject(origem.fotos)
            }
        }
    }

    @Debounce()
    public writeValue(obj: any): void {
        this.object = obj;
    }

    // Função chamada quando o valor interno muda
    private onChange: (value: any) => void = () => { };

    // Função chamada quando o componente é tocado (tocado no DOM)
    private onTouched: () => void = () => { };

    // Registra a função a ser chamada quando o valor interno muda
    public registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    // Registra a função a ser chamada quando o componente é tocado
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disableForm = isDisabled;
    }

    public onClickAddAnalise(amostra: SolicitationAmostra): void {
        if (ObjectUtils.isEmpty(amostra.analises)) {
            amostra.analises = [];
        }
        const analise = new SolicitationAmostraAnalise();
        analise.amostra = new SolicitationAmostra();
        analise.amostra.id = amostra.id;
        amostra.analises.push(analise);
    }

    public onChangeDatas(analise: SolicitationAmostraAnalise): void {
        if (ObjectUtils.isNotEmpty(analise.dataini) && ObjectUtils.isNotEmpty(analise.datafin)) {
            if (analise.dataini.getTime() > analise.datafin.getTime()) {
                const temp = analise.dataini;
                analise.dataini = analise.datafin;
                analise.datafin = temp;
            }
        }
    }

    public onClickRemoveAnalise(amostra: SolicitationAmostra, index: number): void {
        amostra.analises.splice(index, 1);
    }

    public isAmostraAnalisesValidToSave(amostra: SolicitationAmostra): boolean {
        return ObjectUtils.isNotEmpty(amostra.analises.length) && amostra.analises.filter(it => it.dataini == null || it.equipment == null).length == 0;
    }

    public amostraPodeFinalizar(amostra: SolicitationAmostra): boolean {
        if (ObjectUtils.isNotEmpty(amostra.analises)) {
            for (const analise of amostra.analises) {
                if (ObjectUtils.isEmpty(analise.dataini) || ObjectUtils.isEmpty(analise.equipment) ||
                    ObjectUtils.isEmpty(analise.datafin) || ObjectUtils.isEmpty(analise.id)) {
                    return false;
                }
            }
        }
        return true;
    }

    public onClickSalvarAnalise(amostra: SolicitationAmostra): void {
        this.blockForm();
        this.solicitationService.saveAnalise(amostra).then(() => {
            this.toastrService.showSuccess(this.getTitle(), 'Registro salvo com sucesso!');
        }, error => {
            if (this.hasErrorMapped(error)) {
                this.errorHandler(error);
            } else {
                this.toastrService.showError(this.getTitle(), 'Erro ao salvar Registro!');
            }
        }).finally(() => this.releaseForm());
    }

    public getTitle(): string {
        let title = document.title;
        if (title.includes('|')) {
            title = title.substring(title.indexOf('|' + 1));
        }
        return title;
    }

    public hasErrorMapped(error: any): boolean {
        return ObjectUtils.isNotEmpty(error) &&
            ((ObjectUtils.isNotEmpty(error.error) && !!error.error.mapped) ||
                (!!error.mapped));
    }

    public errorHandler(error: any, title?: string): void {
        if (!this.hasErrorMapped(error)) {
            return;
        } else {
            if (ObjectUtils.isEmpty(title)) {
                title = this.getTitle();
            }

            let message: string = '';
            let errosCompCtrl: any = null;
            if ((ObjectUtils.isNotEmpty(error.error) && !!error.error.mapped)) {
                message = error.error.message;
                errosCompCtrl = error.error.erros;
            } else {
                message = error.message;
                errosCompCtrl = error.errors;
            }

            if (ObjectUtils.isNotEmpty(message)) {
                this.toastrService.showError(title, message);
            } else if (ObjectUtils.isNotEmpty(errosCompCtrl)) {
                for (const key in errosCompCtrl) {
                    this.componentes.toArray()
                        ?.find(it => it.compCtrl == key || it.compCtrl.toLocaleLowerCase().replaceAll(' ', '') == key)
                        ?.invalidate(errosCompCtrl[key]);
                }
            } else {
                console.error('Erro não mapeado:', error);
            }
        }
    }

    public possuiAnaliseDatafimNaoPreenchida(amostra: SolicitationAmostra): boolean {
        if (ObjectUtils.isNotEmpty(amostra.analises)) {
            return amostra.analises.findIndex(it => it.datafin == null) > -1;
        }
        return false;
    }

    public onClickFinalizarAmostra(amostra: SolicitationAmostra): void {
        const sweetAlertOptions: SweetAlertOptions = {
            title: 'Atenção',
            html: `Deseja realmente <br>${amostra.concluida ? 'Retomar' : 'Concluir'}</b> a atualização desta amostra?`,
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
                this.blockForm();
                this.solicitationService.finalizarAmostra(amostra).then(() => {
                    this.toastrService.showSuccess(this.getTitle(), 'Registro salvo com sucesso!');
                }, error => {
                    if (this.hasErrorMapped(error)) {
                        this.errorHandler(error);
                    } else {
                        this.toastrService.showError(this.getTitle(), 'Erro ao salvar Registro!');
                    }
                }).finally(() => this.releaseForm());
            }
        });
    }

}
