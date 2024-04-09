import { Roles } from '../core/enums/roles.enum';



export class UserLoginDTO {

    displayName: string = null;
    email: string = null;
    role: Roles = null;

}
