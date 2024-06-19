import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';

import { ComboboxComponent } from '../../../../components/combobox/combobox.component';
import { FormCrud } from '../../../../components/form-crud/form-crud';
import { FormCrudComponent } from '../../../../components/form-crud/form-crud.component';
import { Roles } from '../../../../core/enums/roles.enum';
import { UserDTO } from '../../../../dtos/user.dto';
import { StudentTeacher } from '../model/studentteacher.model';
import { StudentTeacherService } from '../studentteacher.service';
import { UserService } from './../../../cadastros/user/user.service';


@Component({
    selector: 'StudentTeacherFormComponent',
    templateUrl: './studentteacher-form.component.html',
    styleUrl: './studentteacher-form.component.scss'
})
export class StudentTeacherFormComponent extends FormCrud<StudentTeacher> implements AfterViewInit {

    @ViewChild('formView') public formView: FormCrudComponent;
    @ViewChild('compoAluno') compoAluno: ComboboxComponent;

    public isAdmin: boolean = Roles.ROLE_ADMIN == this.authentication.getUserLogged().role;
    public isAluno: boolean = Roles.ROLE_STUDENT == this.authentication.getUserLogged().role;
    public isProfessor: boolean = Roles.ROLE_PROFESSOR == this.authentication.getUserLogged().role;

    public professores: UserDTO[] = [];
    public alunos: UserDTO[] = [];

    private userService: UserService;
    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: StudentTeacherService,
    ) {
        super(injector, service);
        this.userService = this.injector.get(UserService);
    }

    public override ngAfterContentInit(): void {
        super.ngAfterContentInit()

    }

    public async ngAfterViewInit(): Promise<void> {
        await this.userService.findAllByRole(Roles.ROLE_PROFESSOR).then(async data => {
            this.professores = data;
            await this.userService.findAllByRole(Roles.ROLE_STUDENT).then(async data => {
                this.alunos = data;
                setTimeout(() => {
                    if (this.isAluno) {
                        this.object.student.id = this.authentication.getUserLogged().id;
                    } else if (this.isProfessor) {
                        this.object.professor.id = this.authentication.getUserLogged().id;
                    }
                });
            })
        });
    }

    public override showButtons(button: string): boolean {
        if (this.objectUpdating()) {
            return ['excluir', 'cancelar'].indexOf(button) != -1;
        } else {
            return true;
        }
    }

}
