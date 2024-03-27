import { Roles } from '../../../core/enums/roles.enum';
import { ZModel } from '../../../generics/zmodel';

export class UserLogin extends ZModel {
    displayName: string = null;
    email: string = null;
    role: Roles = null;
}
