import { Enum, Prop, Title } from '../../../../core/decorators/decorators';
import { Roles } from '../../../../core/enums/roles.enum';
import { ZModel } from '../../../../generics/zmodel';


export class Domain extends ZModel {

    public static override createInstance(): Domain {
        return new Domain();
    }

    @Title('Domínio')
    @Prop('text')
    domain: string = null;

    @Title('Permissão')
    @Prop('enum')
    @Enum('Roles')
    role: Roles = null;

}
