import { CLAEModoEluicao } from '../../../core/enums/clae-modo-eluicao.enum';
import { CORTipoLeitura } from '../../../core/enums/cor-tipo-leitura.enum';
import { DRXModoAnalise } from '../../../core/enums/drx-modo-analise.enum';
import { FTMIREstado } from '../../../core/enums/ftmir-estado.enum';
import { FTMIRRegistroEspectro } from '../../../core/enums/ftmir-registro-espectro.enum';
import { FTMIRServico } from '../../../core/enums/ftmir-servico.enum';
import { ZModel } from '../../../generics/zmodel';
import { AAForno } from './../../../core/enums/aa-forno.enum';
import { RetiradaAmostra } from './../../../core/enums/retirada-amostras.enum';
import { SolicitationAmostra } from './solicitation-amostra.model';
import { SolicitationFormGradiente } from './solicitation-form-gradiente.model';
import { Solicitation } from './solicitation.model';

export class SolicitationForm extends ZModel {

    public static override createInstance(): SolicitationForm {
        return new SolicitationForm();
    }

    solicitation: Solicitation = null;
    retirada: RetiradaAmostra = RetiradaAmostra.FALSE;
    citacao: boolean = false;
    amostras: SolicitationAmostra[] = [];

    // AA
    methodologyDescription: string = null;
    limitesConcentracao: string = null;
    forno: AAForno = null;
    elementos: string = null;
    curvaConcentracao: string = null;

    // CLAE
    coluna: string = null;
    fluxo: number = null;
    tempoAnalise: number = null;
    volumeInjetado: number = null;
    temperaturaFornoColuna: number = null;
    utilizaPDA: boolean = false;
    compOndaCanal1: number = null;
    compOndaCanal2: number = null;
    modoEluicao: CLAEModoEluicao = null;
    composicaoFaseMovel: string = null;
    gradientes: SolicitationFormGradiente[] = [];

    // COR
    locationMed: string = null;
    tipoLeitura: CORTipoLeitura = null;

    // DRX
    modoAnalise: DRXModoAnalise = DRXModoAnalise.CN;

    // FTMIR
    servico: FTMIRServico = null;
    faixaVarredura: string = null;
    scans: number = null;
    resolucao: number = null;
    registrosEspectos: FTMIRRegistroEspectro = null;
    caracteristica: FTMIREstado = null;
    solvente: string = null;
}
