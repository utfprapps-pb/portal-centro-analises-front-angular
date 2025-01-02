import { ZModel } from '../../../generics/zmodel';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';


export class Analysis extends ZModel {

    public static override createInstance(): Analysis {
        return new Analysis();
    }

    name: string = null;
    description: string = null;
    equipment: Equipment = null;

}
