import { UserType } from '../../core/enums/user-type.enum';
import { ZModel } from '../../generics/zmodel';

export class RegisterUser extends ZModel {
    public static override createInstance(): RegisterUser {
        return new RegisterUser();
    }

    name: string = null;
    email: string = null;
    password: string = null;
    cpfCnpj: string = '';
    raSiape: string = null;
    type: UserType = UserType.PF;
}
