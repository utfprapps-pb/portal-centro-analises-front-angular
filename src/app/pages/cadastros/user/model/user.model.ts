import { Enum, Hidden, Mask, Prop, Title } from '../../../../core/decorators/decorators';
import { Roles } from '../../../../core/enums/roles.enum';
import { StatusAI } from '../../../../core/enums/statusai.enum';
import { UserType } from '../../../../core/enums/user-type.enum';
import { UserDTO } from '../../../../dtos/user.dto';
import { Permission } from './permissions.model';

export class User extends UserDTO {

    public static override createInstance(): User {
        return new User();
    }

    @Title('Nome')
    @Prop('text')
    override name: string = null;

    @Title('Email')
    @Prop('text')
    override email: string = null;

    @Hidden()
    @Title('Tipo de Pessoa')
    @Prop('enum')
    @Enum('UserType')
    override type: UserType;

    @Title('Permissão')
    @Prop('enum')
    @Enum('Roles')
    override role: Roles = null;

    @Title('Status')
    @Prop('enum')
    @Enum('StatusAI')
    override status: StatusAI = null;

    @Hidden()
    @Title('Email Verificado')
    @Prop('boolean')
    emailVerified: boolean = null;

    @Hidden()
    @Title('RA')
    @Prop('numeric')
    override raSiape: string = null;

    @Hidden()
    @Title('CPF/CNPJ')
    @Prop('text')
    @Mask('cpfcnpj', 'cpfcnpj')
    override cpfCnpj: string = null;

    // @Title('CPF/CNPJ')
    // @Prop(new Partner(), ['id', 'name'])
    // partner: Partner = null;

    @Hidden()
    permissions: Permission[] = [];

    @Title('Data de Criação')
    @Prop('date')
    createdAt: Date = null;

    @Hidden()
    @Title('Data de Atualização')
    @Prop('date')
    updatedAt: Date = null;

    @Title('Saldo')
    @Prop('currency')
    balance: number = null;

}
