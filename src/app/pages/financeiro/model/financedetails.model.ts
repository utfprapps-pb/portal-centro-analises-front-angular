import { ZModelCrud } from '../../../generics/zmodel-crud';
import { Equipment } from '../../cadastros/equipment/model/equipment.model';
import { User } from '../../cadastros/user/model/user.model';
import { Finance } from './finance.model';

export class FinanceDetails extends ZModelCrud {

    public static override createInstance(): FinanceDetails {
        const blank = new FinanceDetails();
        blank.createdBy = new User();
        blank.updatedBy = new User();
        blank.finance = new Finance();
        blank.equipment = new Equipment();
        return blank;
    }

    finance: Finance = null;
    equipment: Equipment = null;
    calculateByHours: boolean = false;
    quantity: number = null;
    value: number = null;

}

