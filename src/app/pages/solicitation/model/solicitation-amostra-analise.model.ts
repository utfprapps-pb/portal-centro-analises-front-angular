import { ZModel } from '../../../generics/zmodel';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';
import { SolicitationAmostra } from './solicitation-amostra.model';

export class SolicitationAmostraAnalise extends ZModel {

    public static override createInstance(): SolicitationAmostraAnalise {
        return new SolicitationAmostraAnalise();
    }

    amostra: SolicitationAmostra = null;
    dataini: Date = null;
    datafin: Date = null;
    equipment: Equipment = null;

}
