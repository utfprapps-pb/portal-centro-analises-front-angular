import { Enum, Hidden, Prop, Title } from '../../../core/decorators/decorators';
import { SolicitationProjectNature } from '../../../core/enums/solicitation-project-nature.enum';
import { ZModel } from '../../../generics/zmodel';
import { User } from '../../cadastros/user/model/user.model';

export class Project extends ZModel {

    public static override createInstance(): Project {
        const blank = new Project();
        blank.user = new User();
        return blank;
    }

    @Title('Título')
    @Prop('text')
    subject: string = null;

    @Title('Descrição')
    @Prop('text')
    description: string = null;

    @Title('Responsável')
    @Prop(User.createInstance(), ['name', 'email'])
    user: User = null;

    @Hidden()
    students: User[] = []

    @Title('Natureza')
    @Prop('enum')
    @Enum('SolicitationProjectNature')
    projectNature: SolicitationProjectNature = null;

    @Title('Outra Natureza')
    @Prop('text')
    otherProjectNature: string = null;

}

