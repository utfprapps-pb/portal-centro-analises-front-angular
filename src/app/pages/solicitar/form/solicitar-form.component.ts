import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Stepper } from 'primeng/stepper';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { Roles } from '../../../core/enums/roles.enum';
import { UserLoginDTO } from '../../../dtos/user-login-dto';
import { ObjectUtils } from '../../../utils/object-utils';
import { Project } from '../../project/model/project.model';
import { ProjectService } from '../../project/project.service';
import { SolicitationAmostra } from '../model/solicitation-amostra.model';
import { Solicitation } from '../model/solicitation.model';
import { SolicitarService } from '../solicitar.service';


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

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitarService,
        protected readonly projectService: ProjectService,
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
        if (this.activeStep >= 2) {
            return !this.isValidForm() || this.object.form.citacao == undefined || !this.object.form.citacao
        }
        return false;
    }

    public override async onAfterLoadObject(object: Solicitation): Promise<void> {
        await this.projectService.findAllSelf().then(async data => {
            this.projetos = data;
        });
    }

    public onChangeProject(project: Project): void {
        this.object.professor = null;
        this.responsavel = this.authentication.getUserLogged();

        this.object.project = project;
        this.object.projectNature = project?.projectNature;
        this.object.otherProjectNature = project?.otherProjectNature;

        if (ObjectUtils.isNotEmpty(project)) {
            if (project.user.role == Roles.ROLE_PROFESSOR) {
                this.object.professor = project.user;
            }
            this.responsavel = project.user;
        }
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
        if (this.activeStep == 2) {
            this.object.form.citacao = false;
        }
    }

    public getSolicitationType(): string {
        return this.object.solicitationType;
    }

    public isValidForm(): boolean {
        return this.hasViewInitializated && this.validateForm(false) && ObjectUtils.isNotEmpty(this.object.form.citacao) && this.object.form.citacao;
    }

    protected override onBeforeSave(object: Solicitation): Promise<void> {
        if (this.getSolicitationType() != 'AA') {
            delete object.form.methodologyDescription;
            delete object.form.limitesConcentracao;
            delete object.form.forno;
            delete object.form.elementos;
            delete object.form.curvaConcentracao;
        }

        if (this.getSolicitationType() == 'CLAE') {
            if (object.form.utilizaPDA != true) {
                object.form.compOndaCanal1 = null;
                object.form.compOndaCanal2 = null;
            }
            if (object.form.modoEluicao == 'ISO') {
                object.form.condicoesGradiente = null;
            } else {
                object.form.composicaoFaseMovel = null;
            }
        } else {
            delete object.form.coluna;
            delete object.form.fluxo;
            delete object.form.tempoAnalise;
            delete object.form.volumeInjetado;
            delete object.form.temperaturaFornoColuna;
            delete object.form.utilizaPDA;
            delete object.form.compOndaCanal1;
            delete object.form.compOndaCanal2;
            delete object.form.modoEluicao;
            delete object.form.composicaoFaseMovel;
            delete object.form.condicoesGradiente;
        }

        if (this.getSolicitationType() != 'COR') {
            delete object.form.locationMed;
            delete object.form.tipoLeitura;
        }

        return null;
    }

    public onClickAddAmostra(): void {
        this.object.form.amostras.push(new SolicitationAmostra());
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

                this.object.form.amostras[i] = this.convertUtilsService.cloneObject(origem);
                this.object.form.amostras[i].identification = identificationOrigem;
                this.object.form.amostras[i].description = descriptionOrigem;
                this.object.form.amostras[i].leituras = leiturasOrigem;
            }
        }

    }

}
