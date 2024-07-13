import { Component, Injector, ViewChild } from '@angular/core';

import { DatatableComponent } from '../../../components/datatable/datatable/datatable.component';
import { FormList } from '../../../components/form-list/form-list';
import { FormListComponent } from '../../../components/form-list/form-list.component';
import { Project } from '../model/project.model';
import { ProjectService } from '../project.service';


@Component({
    selector: 'ProjectListComponent',
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.scss'
})
export class ProjectListComponent extends FormList<Project> {

    @ViewChild('formView') public formView: FormListComponent<Project>;
    @ViewChild('formViewDatatable') public formViewDatatable: DatatableComponent;

    private userID = this.authentication.getUserLogged().id;

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ProjectService,
    ) {
        super(injector, service);
    }

    public allowDeleteRow(row: Project): boolean {
        return this.isAdmin || (row.user.id == this.userID);
    }

    public override showButtons(button: string): boolean {
        if (button == 'cancelar') {
            return true;
        } else {
            return !this.isAluno;
        }
    }

}
