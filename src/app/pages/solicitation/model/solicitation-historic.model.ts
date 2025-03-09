import { SolicitationStatus } from '../../../core/enums/solicitation-status.enum';
import { ZModel } from '../../../generics/zmodel';
import { User } from '../../cadastros/user/model/user.model';
import { Solicitation } from './solicitation.model';


export class SolicitationHistoric extends ZModel {

    public static override createInstance(): SolicitationHistoric {
        const blank = new SolicitationHistoric();
        blank.solicitation = new Solicitation();
        blank.createdBy = new User();
        return blank;
    }

    solicitation: Solicitation = null;
    status: SolicitationStatus = null;
    createdBy: User = null;
    createdAt: Date = null;
    observation: string = null;

}
