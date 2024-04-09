import { Roles } from '../../../core/enums/roles.enum';
import { ZModel } from '../../../generics/zmodel';

export class User extends ZModel {
    public static override createInstance(): User {
        return new User();
    }

    name: string = null;
    email: string = null;
    role: Roles = null;
    status: string = null;
    createdAt: Date = null;
    updatedAt: Date = null;
    emailVerified: boolean = false;
}
