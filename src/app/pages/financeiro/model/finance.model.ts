import { Attachment } from '../../../components/uploadfile/model/attachment.model';
import { Enum, Prop, Title } from '../../../core/decorators/decorators';
import { FinanceState } from '../../../core/enums/financestate.enum';
import { ZModelCrud } from '../../../generics/zmodel-crud';
import { User } from '../../cadastros/user/model/user.model';
import { Solicitation } from '../../solicitation/model/solicitation.model';
import { FinanceDetails } from './financedetails.model';

export class Finance extends ZModelCrud {

    public static override createInstance(): Finance {
        const blank = new Finance();
        blank.createdBy = new User();
        blank.updatedBy = new User();
        blank.responsavel = new User();
        blank.pagador = new User();
        blank.solicitation = new Solicitation();
        blank.details = [];
        blank.attachments = [];
        return blank;
    }

    @Title('Descricao')
    @Prop('text')
    description: string = null;

    @Title('Status')
    @Enum('FinanceState')
    @Prop('enum')
    state: FinanceState | string = 'PENDING';

    @Title('Valor')
    @Prop('currency')
    value: number = null;

    @Title('Data de Vencimento')
    @Prop('date')
    dueDate: Date = null;

    observacao: string = null;

    @Title('Responsável')
    @Prop(User.createInstance(), ['id', 'name'])
    responsavel: User = null;

    @Title('Pagador')
    @Prop(User.createInstance(), ['id', 'name'])
    pagador: User = null;

    alterarSaldo: boolean = true;

    solicitation: Solicitation = null;

    details: FinanceDetails[] = [];

    attachments: Attachment[] = [];

}

