import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Stepper } from 'primeng/stepper';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { UserLoginDTO } from '../../../dtos/user-login-dto';
import { ObjectUtils } from '../../../utils/object-utils';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from '../../project/model/project.model';
import { ProjectService } from '../../project/project.service';
import { SolicitationAmostraFoto } from '../../solicitation/model/solicitation-amostra-foto.model';
import { SolicitationAmostra } from '../../solicitation/model/solicitation-amostra.model';
import { SolicitationTermsOfUse } from '../../solicitation/model/solicitation-termsofuse.model';
import { Solicitation } from '../../solicitation/model/solicitation.model';
import { SolicitationService } from '../../solicitation/solicitation.service';
import { TermsOfUseService } from '../../termsofuse/termsofuse.service';
import { SolicitationFormType } from './../../../core/enums/solicitation-form-type.enum';


@Component({
    selector: 'SolicitarFormComponent',
    templateUrl: './solicitar-form.component.html',
    styleUrl: './solicitar-form.component.scss'
})
export class SolicitarFormComponent extends FormCrud<Solicitation> implements AfterViewInit {

    @ViewChild('formView') public formView: FormCrudComponent;
    @ViewChild('stepper') public stepper: Stepper;

    public activeStep: number = 0;

    public readonly OPCAO_OUTRO: any = 'OTHER';
    public readonly NATUREZA_ORGANICA_ORGANICA: any = 'ORG';
    public readonly NATUREZA_ORGANICA_INORGANICA: any = 'INO';

    public projetos: Project[] = [];
    public responsavel: UserLoginDTO = null;

    public hasViewInitializated: boolean = false;
    private uniqueProject: Project = null;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitationService,
        protected readonly projectService: ProjectService,
        protected readonly termsOfUseService: TermsOfUseService,
    ) {
        super(injector, service);
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.hasViewInitializated = true;
        });
    }

    public override showButtons(button: string): boolean {
        return false; // this.activeStep == 0 && ['cancelar'].includes(button);
    }

    private lastSolicitationType: SolicitationFormType = null;
    public onChangeSolicitationType(): void {
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

    public onClickVoltarStep(): void {
        if (this.activeStep > 0) {
            this.activeStep--;
            this.onChangeStep();
        }
    }

    public onClickAvancarStep(): void {
        if (this.activeStep < (this.stepper.panels.length - 1)) {
            this.activeStep++;
            this.onChangeStep();
        }
    }

    public onClickFinalizar(): void {
        if (!this.disableButtonAvancar()) {
            this.onClickSalvar();
        }
    }

    public disableButtonAvancar(): boolean {
        if (this.activeStep >= 3 && this.activeStep < 5) {
            return !this.validateForm(false);
        } else if (this.activeStep == 5) {
            return !( // Inversão pois é para desabilitar o botão
                this.validateForm(false) && // Formulário Valído
                !!this.object.form.citacao && // Citação Marcada
                this.object.termsOfUses.find(termo => !!termo.accepted == false) == undefined // Concordou com todos termos
            );
        }
        return false;
    }

    public override async onAfterLoadObject(object: Solicitation): Promise<void> {
        await this.projectService.findAllSelf().then(async data => {
            this.projetos = data;
            if (data.length == 1) {
                this.uniqueProject = data[0];
                this.object.project = this.uniqueProject;
            }
        });
    }

    public onChangeProject(project: Project): void {
        if (this.uniqueProject && project == null) {
            this.object.project = this.uniqueProject;
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

    public onChangeNaturezaAmostra(): void {
        if (this.object.form.naturezaAmostra == "INO") {
            this.object.form.descarteOrganico = null;
            this.object.form.descarteOrganicoOutro = null;
        } else {
            this.object.form.descarteInorganico = null;
            this.object.form.descarteInorganicoOutro = null;
        }
    }

    public onChangeDescarteOrganico(): void {
        if (this.object.form?.descarteOrganico != this.OPCAO_OUTRO) {
            this.object.form.descarteOrganicoOutro = null;
        }
    }

    public onChangeDescarteInorganico(): void {
        if (this.object.form?.descarteInorganico != this.OPCAO_OUTRO) {
            this.object.form.descarteInorganicoOutro = null;
        }
    }

    public onChangeDescarteUsuario(): void {
        if (this.object.form?.descarteOrganico != this.OPCAO_OUTRO) {
            this.object.form.descarteUsuarioOutro = null;
        }
    }

    public onChangeStep(): void {
        document.querySelector('html').scrollTop = 0
        if (this.activeStep == 5) {
            this.blockForm();
            this.object.form.citacao = false;
            this.termsOfUseService.findAll().then(termos => {
                for (const data of termos) {
                    if (ObjectUtils.isEmpty(data) || data.solicitationType == this.object.solicitationType) {
                        const bind = new SolicitationTermsOfUse();
                        bind.termofuse = data;
                        this.object.termsOfUses.push(bind);
                    }
                }
            }).finally(() => this.releaseForm());
        }
    }

    public getSolicitationType(): string {
        return this.object.solicitationType;
    }

    public onClickAddAmostra(): void {
        const novaAmostra: SolicitationAmostra = new SolicitationAmostra();
        if (this.getSolicitationType() == 'MEV') {
            this.onClickAddFotoMev(novaAmostra);
        }
        this.object.form.amostras.push(novaAmostra);
        this.updateAmostraNumber();
    }

    public onClickRemoveAmostra(index: number): void {
        this.object.form.amostras.splice(index, 1);
        this.updateAmostraNumber();
        if (ObjectUtils.isEmpty(this.object.form.amostras)) {
            this.onClickAddAmostra();
        }
    }

    private updateAmostraNumber(): void {
        this.object.amountSamples = this.object.form.amostras.length;
    }

    public onClickReplicarDadosAmostras(index: number): void {
        const origem: SolicitationAmostra = this.convertUtilsService.cloneObject(this.object.form.amostras[index]);

        for (let i = 0; i < this.object.form.amostras.length; i++) {
            if (i != index) {
                const identificationOrigem = this.convertUtilsService.cloneObject(this.object.form.amostras[i].identification);
                const descriptionOrigem = this.convertUtilsService.cloneObject(this.object.form.amostras[i].description);
                const leiturasOrigem = this.convertUtilsService.cloneObject(this.object.form.amostras[i].leituras);
                const tipoAmostraOrigem = this.convertUtilsService.cloneObject(this.object.form.amostras[i].tipoAmostra);
                const modeloMicroscopiaOrigem = this.convertUtilsService.cloneObject(this.object.form.amostras[i].modeloMicroscopia);

                this.object.form.amostras[i] = this.convertUtilsService.cloneObject(origem);
                this.object.form.amostras[i].identification = identificationOrigem;
                this.object.form.amostras[i].description = descriptionOrigem;
                this.object.form.amostras[i].leituras = leiturasOrigem;
                this.object.form.amostras[i].tipoAmostra = tipoAmostraOrigem;
                this.object.form.amostras[i].modeloMicroscopia = modeloMicroscopiaOrigem;
            }
        }
    }

    public onClickAddFotoMev(amostra: SolicitationAmostra): void {
        if (ObjectUtils.isEmpty(amostra.fotos)) {
            amostra.fotos = [];
        }
        const foto: SolicitationAmostraFoto = new SolicitationAmostraFoto();
        amostra.fotos.push(foto);
    }

    public onClickRemoveFotoMev(amostra: SolicitationAmostra, index: number): void {
        amostra.fotos.splice(index, 1);
        this.updateAmostraNumber();
        if (ObjectUtils.isEmpty(amostra.fotos)) {
            this.onClickAddFotoMev(amostra);
        }
    }

    public getBucketName(): string {
        return `${this.authentication.getUserLogged().id}`
    }

}
