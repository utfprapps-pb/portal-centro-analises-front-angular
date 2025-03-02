import { Enum, Hidden, Prop, Title } from '../../../../core/decorators/decorators';
import { Roles } from '../../../../core/enums/roles.enum';
import { StudentTeacherApproved } from '../../../../core/enums/studentteacher-approved.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { ZModel } from '../../../../generics/zmodel';
import { User } from '../../../cadastros/user/model/user.model';

export class StudentTeacher extends ZModel {

    public static override createInstance(): StudentTeacher {
        return new StudentTeacher();
    }

    @Title('Status')
    @Prop('enum')
    @Enum('StudentTeacherApproved')
    approved: StudentTeacherApproved = null;

    @Title('Estudante')
    @Prop(User.createInstance(), ['id', 'name', 'email', 'raSiape'])
    @Hidden(!!AuthService.USER_LOGGED && Roles.ROLE_STUDENT == AuthService.USER_LOGGED.role)
    student: User = new User();

    @Title('Professor')
    @Prop(User.createInstance(), ['id', 'name', 'email'])
    @Hidden(!!AuthService.USER_LOGGED && Roles.ROLE_PROFESSOR == AuthService.USER_LOGGED.role)
    professor: User = new User();

    @Title('Data de Criação')
    @Prop('date')
    @Hidden()
    createdAt: Date = null;


}

