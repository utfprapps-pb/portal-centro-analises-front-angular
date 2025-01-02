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

    project: Project = null;
    projectNature: SolicitationProjectNature = null;
    otherProjectNature: String = null;
    professor: User = null;

    createdBy: User = null;
    updatedBy: User = null;
    createdAt: Date = null;
    updatedAt: Date = null;

    status: SolicitationStatus = null;
    equipment: Equipment = null;
    methodologyDescription: string = null;
    form: Object = null;

    scheduleDate: Date = null;
    analysis: Analysis = null;
    solicitationAttachments: SolicitationAttachments[] = [];

    price: number = null;
    amountHours: number = null;
    amountSamples: number = null;
    totalPrice: number = null;

    observation: string = null;

}
