import { StatusAI } from '../core/enums/statusai.enum';
import { UserType } from '../core/enums/user-type.enum';
import { UserLoginDTO } from './user-login-dto';

export class UserDTO extends UserLoginDTO {
    public static override createInstance(): UserDTO {
        return new UserDTO();
    }

    type: UserType = null;
    name: string = null;
    status: StatusAI = null;
    cpfCnpj: string = null;
    professor: UserDTO = null;
}
