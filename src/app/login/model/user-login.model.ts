import { Roles } from '../../core/enums/roles.enum';
import { ZModel } from '../../generics/zmodel';


export class UserLogin extends ZModel {
    public static override createInstance(): ZModel {
        return new UserLogin();
    }

    displayName: string = null;
    email: string = null;
    role: Roles = null;
}
