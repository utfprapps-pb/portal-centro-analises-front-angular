import { SolicitationProjectNature } from '../../../core/enums/solicitation-project-nature.enum';
import { SolicitationStatus } from '../../../core/enums/solicitation-status.enum';
import { ZModel } from '../../../generics/zmodel';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from '../../project/model/project.model';
import { Analysis } from './analysis.model';
import { SolicitationAttachments } from './solicitation-attachments.model';


export class Solicitation extends ZModel {

    public static override createInstance(): Solicitation {
        return new Solicitation();
    }

    createdBy: User = null;
    professor: User = null;
    updatedBy: User = null;
    status: SolicitationStatus = null;
    equipment: Equipment = null;
    project: Project = null;
    methodologyDescription: String = null;
    form: Object = null;
    projectNature: SolicitationProjectNature = null;
    otherProjectNature: String = null;
    scheduleDate: Date = null;
    createdAt: Date = null;
    updatedAt: Date = null;
    price: number = null;
    amountHours: number = null;
    amountSamples: number = null;
    totalPrice: number = null;
    solicitationAttachments: SolicitationAttachments[] = [];
    analysis: Analysis = null;
    observation: String = null;

}
