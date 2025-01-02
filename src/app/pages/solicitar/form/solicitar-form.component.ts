import { Component, Injector, ViewChild } from '@angular/core';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { Roles } from '../../../core/enums/roles.enum';
import { ObjectUtils } from '../../../utils/object-utils';
import { Project } from '../../project/model/project.model';
import { ProjectService } from '../../project/project.service';
import { Solicitation } from '../model/solicitation.model';
import { SolicitarService } from '../solicitar.service';


@Component({
    selector: 'SolicitarFormComponent',
    templateUrl: './solicitar-form.component.html',
    styleUrl: './solicitar-form.component.scss'
})
export class SolicitarFormComponent extends FormCrud<Solicitation> {

    @ViewChild('formView') public formView: FormCrudComponent;
    public activeStep: number = 0;

    public readonly NATURE_OTHER: any = 'OTHER';
    public projetos: Project[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: SolicitarService,
        protected readonly projectService: ProjectService,
    ) {
        super(injector, service);
    }

    public override showButtons(button: string): boolean {
        return ['cancelar'].indexOf(button) != -1;
    }

    public override async onAfterLoadObject(object: Solicitation): Promise<void> {
        await this.projectService.findAllSelf().then(async data => {
            this.projetos = data;
        });

    }

    public onChangeProject(project: Project): void {
        this.object.professor = null;

        this.object.project = project;
        this.object.projectNature = project?.projectNature;
        this.object.otherProjectNature = project?.otherProjectNature;

        if (ObjectUtils.isNotEmpty(project)) {
            if (project.user.role == Roles.ROLE_PROFESSOR) {
                this.object.professor = project.user;
            }
        }
    }


}
