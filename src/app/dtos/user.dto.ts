import { Roles } from '../core/enums/roles.enum';
import { StatusInactiveActive } from '../core/enums/status-inactive-active.enum';
import { ZModel } from '../generics/zmodel';

export class UserDTO extends ZModel {
    public static override createInstance(): UserDTO {
        return new UserDTO();
    }

    role: Roles = null;
    name: String = null;
    email: String = null;
    status: StatusInactiveActive = null;
    createdAt: Date = null;
    updatedAt: Date = null;
    emailVerified: Boolean = null;
    balance: Number = null;
    ra: String = null;
    siape: String = null;
    cpf: String = null;
    cnpj: String = null;
}
