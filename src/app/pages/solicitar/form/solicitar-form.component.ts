import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Accordion } from 'primeng/accordion';
import { Stepper } from 'primeng/stepper';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { ObjectUtils } from '../../../utils/object-utils';
import { ProjectService } from '../../project/project.service';
import { SolicitationTermsOfUse } from '../../solicitation/model/solicitation-termsofuse.model';
import { Solicitation } from '../../solicitation/model/solicitation.model';
import { SolicitationService } from '../../solicitation/solicitation.service';
import { TermsOfUseService } from '../../termsofuse/termsofuse.service';
import {
    SolicitarFormularioTemplateComponent,
} from '../solicitar-formulario-template/solicitar-formulario-template.component';


@Component({
    selector: 'SolicitarFormComponent',
    templateUrl: './solicitar-form.component.html',
    styleUrl: './solicitar-form.component.scss'
})
export class SolicitarFormComponent extends FormCrud<Solicitation> implements AfterViewInit {

    @ViewChild('formView') public formView: FormCrudComponent;
    @ViewChild('stepper') public stepper: Stepper;
    @ViewChild('accordionTermos') public accordionTermos: Accordion;
    @ViewChild('formularioTemplate') public formularioTemplate: SolicitarFormularioTemplateComponent;

    public activeStep: number = 0;

    public hasViewInitializated: boolean = false;
    public activeIndexTermsOfUse: number[] = [];
    public termosDeUso: SolicitationTermsOfUse[] = [];

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
        if (this.activeStep == 3) {
            return !this.validateForm(false);
        } else if (this.activeStep == 4) {
            return !( // Inversão pois é para desabilitar o botão
                this.validateForm(false) && // Formulário Valído
                !!this.object?.form?.citacao && // Citação Marcada
                this.object.termsOfUses.find(termo => !!termo.accepted == false) == undefined // Concordou com todos termos
            );
        }
        return false;
    }

    public override validateForm(alert: boolean = true): boolean {
        if (alert && ObjectUtils.isNotEmpty(this.formularioTemplate)) {
            this.formularioTemplate.openAllAccordions();
        }
        if (alert && ObjectUtils.isNotEmpty(this.accordionTermos)) {
            this.activeIndexTermsOfUse = [];
            for (let i = 0; i < this.termosDeUso.length; i++) {
                this.activeIndexTermsOfUse.push(i);
            }
            this.accordionTermos.activeIndex = this.activeIndexTermsOfUse;
        }
        return super.validateForm(alert);
    }

    public onChangeStep(): void {
        document.querySelector('html').scrollTop = 0
        if (this.activeStep == 4) {
            this.blockForm();
            this.object.form.citacao = false;
            this.termsOfUseService.findAll().then(termos => {
                this.activeIndexTermsOfUse = [];
                termos.sort((a, b) => a.id - b.id);
                for (const data of termos) {
                    if (ObjectUtils.isEmpty(data.solicitationType) || data.solicitationType == this.object.solicitationType) {
                        this.activeIndexTermsOfUse.push(this.activeIndexTermsOfUse.length);
                        const bind = new SolicitationTermsOfUse();
                        bind.termofuse = data;
                        this.termosDeUso.push(bind);
                        this.object.termsOfUses.push(bind);
                    }
                }
            }).finally(() => this.releaseForm());
        }
    }

}
