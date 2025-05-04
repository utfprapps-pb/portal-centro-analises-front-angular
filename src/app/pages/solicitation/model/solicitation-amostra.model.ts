import { Attachment } from '../../../components/uploadfile/model/attachment.model';
import { Boolean } from '../../../core/enums/boolean.enum';
import { DRXStep } from '../../../core/enums/drx-step.enum';
import { ZModel } from '../../../generics/zmodel';
import { SolicitationAmostraAnalise } from './solicitation-amostra-analise.model';
import { SolicitationAmostraFoto } from './solicitation-amostra-foto.model';
import { SolicitationForm } from './solicitation-form.model';


export class SolicitationAmostra extends ZModel {

    public static override createInstance(): SolicitationAmostra {
        return new SolicitationAmostra();
    }

    form: SolicitationForm = null;
    concluida: boolean = false;
    index: number = null;

    identification: string = null;
    description: string = null;
    leituras: number = null;

    analises: SolicitationAmostraAnalise[] = [];

    composicao: string = null;
    toxic: string = null;
    naturezaAmostra: string = null;
    descarteOrganico: string = null;
    descarteOrganicoOutro: string = null;
    descarteInorganico: string = null;
    descarteInorganicoOutro: string = null;
    descarteUsuario: string = null;
    descarteUsuarioOutro: string = null;

    // DRX
    faixaVarredura: number = null;
    step: DRXStep | string = '_002';
    velocidadeVarredura: number = null;
    tempoPasso: number = null;

    // DSC - TGADTA
    expande: boolean = null
    liberaGas: Boolean = null
    gasLiberado: string = null
    massa: number = null
    tecnica: string = null
    atmosfera: string = null
    fluxoGas: number = null
    taxaAquecimento: number = null
    intervaloTemperatura: string = null

    // MEV
    tipoAmostra: string = null;
    objetivo: string = null;
    fotos: SolicitationAmostraFoto[] = [];
    modeloMicroscopia: Attachment = null;

}
