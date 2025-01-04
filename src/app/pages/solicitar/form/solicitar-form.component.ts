import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { NgxJsonViewerComponent } from 'ngx-json-viewer';

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
    @ViewChild('viewer') public viewer: NgxJsonViewerComponent;
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
        this.hasViewInitializated = true;
    }

    public override showButtons(button: string): boolean {
        return ['cancelar'].indexOf(button) != -1;
    }

    public override async onAfterLoadObject(object: Solicitation): Promise<void> {
        await this.projectService.findAllSelf().then(async data => {
            this.projetos = data;
        });
        this.updateJson();
    }

    public objectJson: any = {};
    public updateJson(): void {
        this.objectJson = { ...this.object } || {};
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
        if (this.activeStep == 2) {
            this.object.form.citacao = false;
        }
    }

    public getSolicitationType(): string {
        return this.object.solicitationType;
    }

    public onClickFinalizar(): void {
        this.onClickSalvar();
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

}
