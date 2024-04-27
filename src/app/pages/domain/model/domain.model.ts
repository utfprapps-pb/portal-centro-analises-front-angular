import { Enum, Prop } from '../../../core/decorators/decorators';
import { Roles } from '../../../core/enums/roles.enum';
import { ZModel } from '../../../generics/zmodel';

export class Domain extends ZModel {

    public static override createInstance(): Domain {
        return new Domain();
    }

    @Prop('text')
    domain: string = null;

    @Prop('enum')
    @Enum('Roles')
    role: Roles = null;

}
