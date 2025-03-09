import { ColumnMinWidth, Enum, Prop, Title } from '../../../core/decorators/decorators';
import { SolicitationFormType } from '../../../core/enums/solicitation-form-type.enum';
import { SolicitationProjectNature } from '../../../core/enums/solicitation-project-nature.enum';
import { SolicitationStatus } from '../../../core/enums/solicitation-status.enum';
import { ZModel } from '../../../generics/zmodel';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from '../../project/model/project.model';
import { SolicitationAmostra } from './solicitation-amostra.model';
import { SolicitationAttachments } from './solicitation-attachments.model';


export class Solicitation extends ZModel {

    public static override createInstance(): Solicitation {
        const blank = new Solicitation();
        blank.project = new Project();
        blank.responsavel = new User();
        blank.createdBy = new User();
        blank.updatedBy = new User();
        blank.equipment = new Equipment();
        blank.scheduleDate = new Date();
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
    createdAt: Date = null;

    @Title('Alteração')
    @Prop('date')
    @ColumnMinWidth('130px')
    updatedAt: Date = null;

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

    createdBy: User = null;
    updatedBy: User = null;

    equipment: Equipment = null;
    form: any = {
        'retirada': 'FALSE',
        'citacao': false,

        'amostras': [new SolicitationAmostra()],

        // AA
        'methodologyDescription': null,
        'limitesConcentracao': null,
        'forno': null,
        'elementos': null,
        'curvaConcentracao': null,

        // CLAE
        'coluna': null,
        'fluxo': null,
        'tempoAnalise': null,
        'volumeInjetado': null,
        'temperaturaFornoColuna': null,
        'utilizaPDA': null,
        'compOndaCanal1': null,
        'compOndaCanal2': null,
        'modoEluicao': null,
        'composicaoFaseMovel': null,
        'condicoesGradiente': null,

        // COR
        'locationMed': null,
        'tipoLeitura': null,

        // DRX
        'modoAnalise': 'CN',
    };

    scheduleDate: Date = null;
    solicitationAttachments: SolicitationAttachments[] = [];

    price: number = null;
    amountHours: number = null;
    amountSamples: number = 1;
    totalPrice: number = null;

    observation: string = null;
    paid: boolean = false;

}
