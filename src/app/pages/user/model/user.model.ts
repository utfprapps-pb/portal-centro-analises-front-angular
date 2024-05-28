import { Enum, Hidden, Mask, Prop, Title } from '../../../core/decorators/decorators';
import { Roles } from '../../../core/enums/roles.enum';
import { StatusAI } from '../../../core/enums/statusai.enum';
import { UserType } from '../../../core/enums/user-type.enum';
import { ZModel } from '../../../generics/zmodel';
import { Permission } from './permissions.model';

export class User extends ZModel {

    public static override createInstance(): User {
        return new User();
    }

    @Title('Nome')
    @Prop('text')
    name: string = null;

    @Title('Email')
    @Prop('text')
    email: string = null;

    @Hidden()
    @Title('Tipo de Pessoa')
    @Prop('enum')
    @Enum('UserType')
    type: UserType = UserType.PF;

    @Title('Permissão')
    @Prop('enum')
    @Enum('Roles')
    role: Roles = null;

    @Title('Status')
    @Prop('enum')
    @Enum('StatusAI')
    status: StatusAI = null;

    @Hidden()
    @Title('Email Verificado')
    @Prop('boolean')
    emailVerified: boolean = null;

    @Hidden()
    @Title('Saldo')
    @Prop('currency')
    balance: number = null;

    @Hidden()
    @Title('RA')
    @Prop('numeric')
    raSiape: string = null;

    @Hidden()
    @Title('CPF/CNPJ')
    @Prop('text')
    @Mask('cpfcnpj', 'cpfcnpj')
    cpfCnpj: string = null;

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

}
