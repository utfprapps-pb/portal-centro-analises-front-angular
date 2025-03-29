import { AfterViewInit, Component, forwardRef, inject, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Accordion } from 'primeng/accordion';

import { Debounce } from '../../../core/decorators/decorators';
import { CompCtrlDirective } from '../../../core/directives/compctrl/compctrl.directive';
import { SolicitationFormType } from '../../../core/enums/solicitation-form-type.enum';
import { AuthService } from '../../../core/services/auth.service';
import { UserLoginDTO } from '../../../dtos/user-login-dto';
import { ConvertUtilsService } from '../../../utils/convert-utils.service';
import { ObjectUtils } from '../../../utils/object-utils';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from '../../project/model/project.model';
import { ProjectService } from '../../project/project.service';
import { SolicitationAmostraFoto } from '../../solicitation/model/solicitation-amostra-foto.model';
import { SolicitationAmostra } from '../../solicitation/model/solicitation-amostra.model';
import { Solicitation } from '../../solicitation/model/solicitation.model';

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

    private uniqueProject: Project = null;
    public projetos: Project[] = [];
    public responsavel: UserLoginDTO = null;

    private lastSolicitationType: SolicitationFormType = null;

    private habilitarChanges: boolean = true;

    private authentication: AuthService = inject(AuthService);
    private projectService: ProjectService = inject(ProjectService);
    private convertUtilsService: ConvertUtilsService = inject(ConvertUtilsService);

    constructor() {
        this.projectService.findAllSelf().then(async data => {
            this.projetos = data;
            if (data.length == 1) {
                this.uniqueProject = data[0];
            }
        });
    }

    public openAllAccordions(): void {
        this.activeIndexAmostras = [];
        for (let i = 0; i < this.object.form.amostras.length; i++) {
            this.activeIndexAmostras.push(i);
        }
        this.accordion.activeIndex = this.activeIndexAmostras;
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

}
