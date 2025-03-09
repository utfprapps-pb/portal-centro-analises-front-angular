import { Enum, Prop, Title } from '../../../core/decorators/decorators';
import { SolicitationFormType } from '../../../core/enums/solicitation-form-type.enum';
import { StatusAI } from '../../../core/enums/statusai.enum';
import { ZModel } from '../../../generics/zmodel';
import { User } from '../../cadastros/user/model/user.model';

export class TermsOfUse extends ZModel {

    public static override createInstance(): TermsOfUse {
        const blank = new TermsOfUse();
        blank.createdBy = new User();
        blank.updatedBy = new User();
        return blank;
    }

    @Title('Título')
    @Prop('text')
    title: string = null;

    @Title('Status')
    @Prop('enum')
    @Enum('StatusAI')
    status: StatusAI = null;

    @Title('Formulário')
    @Prop('enum')
    @Enum('SolicitationFormType')
    solicitationType: SolicitationFormType = null;

    createdBy: User = null;
    createdAt: Date = null;
    updatedBy: User = null;
    updatedAt: Date = null;

    description: string = null;
    form: string = null;

}

