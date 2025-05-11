import { ColumnMinWidth, Enum, Prop, Title } from '../../../core/decorators/decorators';
import { SolicitationFormType } from '../../../core/enums/solicitation-form-type.enum';
import { SolicitationProjectNature } from '../../../core/enums/solicitation-project-nature.enum';
import { SolicitationStatus } from '../../../core/enums/solicitation-status.enum';
import { ZModelCrud } from '../../../generics/zmodel-crud';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from '../../project/model/project.model';
import { SolicitationForm } from './solicitation-form.model';
import { SolicitationTermsOfUse } from './solicitation-termsofuse.model';


export class Solicitation extends ZModelCrud {

    public static override createInstance(): Solicitation {
        const blank = new Solicitation();
        blank.project = new Project();
        blank.responsavel = new User();
        blank.createdBy = new User();
        blank.updatedBy = new User();
        blank.equipment = new Equipment();
        blank.scheduleDate = new Date();
        blank.form = new SolicitationForm();
        return blank;
    }

    @Title('Formulário')
    @Prop('enum')
    @Enum('SolicitationFormType')
    solicitationType: SolicitationFormType = null;

    @Title('Status')
    @Prop('enum')
    @Enum('SolicitationStatus')
    status: SolicitationStatus = null;

    @Title('Criação')
    @Prop('date')
    @ColumnMinWidth('130px')
    override createdAt: Date = null;

    @Title('Alteração')
    @Prop('date')
    @ColumnMinWidth('130px')
    override updatedAt: Date = null;

    @Title('Projeto')
    @Prop(Project.createInstance(), ['subject'])
    project: Project = null;

    @Title('Natureza')
    @Prop('enum')
    @Enum('SolicitationProjectNature')
    projectNature: SolicitationProjectNature = null;

    @Title('Natureza - Outro')
    @Prop('text')
    otherProjectNature: String = null;

    @Title('Responsável')
    @Prop(User.createInstance(), ['name'])
    responsavel: User = null;

    equipment: Equipment = null;
    form: SolicitationForm = null;

    scheduleDate: Date = null;

    amountSamples: number = 1;
    termsOfUses: SolicitationTermsOfUse[] = []

    observation: string = null;

}
