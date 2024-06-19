import { Roles } from '../core/enums/roles.enum';
import { StatusAI } from '../core/enums/statusai.enum';
import { UserType } from '../core/enums/user-type.enum';
import { ZModel } from '../generics/zmodel';

export class UserDTO extends ZModel {
    public static override createInstance(): UserDTO {
        return new UserDTO();
    }

    role: Roles = null;
    type: UserType = null;
    name: string = null;
    email: string = null;
    status: StatusAI = null;
    balance: number = null;
    raSiape: string = null;
    cpfCnpj: string = null;
    professor: UserDTO = null;
}
