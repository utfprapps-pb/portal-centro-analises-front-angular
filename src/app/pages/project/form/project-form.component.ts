import { Component, Injector, ViewChild } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

import { FormCrud } from '../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../components/form-crud/form-crud.component';
import { getEnumTranslation } from '../../../core/enums/enum-mapper';
import { StudentTeacherApproved } from '../../../core/enums/studentteacher-approved.enum';
import { UserDTO } from '../../../dtos/user.dto';
import { User } from '../../cadastros/user/model/user.model';
import { UserService } from '../../cadastros/user/user.service';
import { StudentTeacher } from '../../vinculos/studentteacher/model/studentteacher.model';
import { StudentTeacherService } from '../../vinculos/studentteacher/studentteacher.service';
import { Project } from '../model/project.model';
import { ProjectService } from '../project.service';


@Component({
    selector: 'ProjectFormComponent',
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent extends FormCrud<Project> {

    @ViewChild('formView') public formView: FormCrudComponent;
    public readonly NATURE_OTHER: any = 'OTHER';

    private userID = this.authentication.getUserLogged().id;

    public responsaveis: UserDTO[] = [];
    public alunos: UserDTO[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: ProjectService,
        protected readonly userService: UserService,
        protected readonly studentTeacherService: StudentTeacherService
    ) {
        super(injector, service);
    }

    public override async onAfterLoadObject(object: Project): Promise<void> {
        this.alunos = this.object.students;
        await this.setSelfResponsavel();
        if (this.isExterno) {
            this.object.students = [this.object.user];
        } else if (this.isAdmin) {
            await this.userService.findAll().then(async data => {
                this.responsaveis = data;
                this.alunos = data;
            });
        } else if (this.isProfessor) {
            await this.studentTeacherService.findAll().then(async (data: StudentTeacher[]) => {
                this.alunos = data.filter(it => getEnumTranslation('StudentTeacherApproved', it.approved) == StudentTeacherApproved.ACEITO).map(it => it.student);
            });
        } else if (this.isPartner) {
            const email = this.authentication.getUserLogged().email;
            const domain = email.substring(email.indexOf('@'));
            await this.userService.findAllByDomain(domain).then(async data => {
                this.responsaveis = data;
                this.alunos = data;
            });
        }
    }

    private async setSelfResponsavel(): Promise<void> {
        if (ObjectUtils.isEmpty(this.object.user) || ObjectUtils.isEmpty(this.object.user.id)) {
            const logged = this.authentication.getUserLogged();
            this.object.user.id = logged.id;
            this.object.user.name = logged.displayName;
            this.object.user.email = logged.email;
        }
        this.responsaveis = [this.object.user];
    }

    public override showButtons(button: string): boolean {
        if (button == 'cancelar') {
            return true;
        } else {
            return this.isResponsavel() || !this.objectUpdating();
        }
    }

    public isResponsavel(): boolean {
        return (this.userID == this.object.user.id) || this.isAdmin;
    }

    public onClickAddAluno(): void {
        this.object.students.push(new User());
    }

    public onClickRemoveAluno(number: number): void {
        this.object.students.splice(number, 1);
    }

    public onChangeProjectNature(): void {
        if (this.object.projectNature != this.NATURE_OTHER) {
            this.object.otherProjectNature = null;
        }
    }

}
