import { ZModel } from '../../../../generics/zmodel';
import { User } from './user.model';

export class UserBalance extends ZModel {

    public static override createInstance(): UserBalance {
        return new UserBalance();
    }

    user: User = null;
    balance: number = null;

}
