import { Enum, Prop, Title } from '../../../../core/decorators/decorators';
import { Action } from '../../../../core/enums/action.enum';
import { ZModel } from '../../../../generics/zmodel';

export class Permission extends ZModel {

    public static override createInstance(): Permission {
        return new Permission();
    }

    @Title('Descrição')
    @Prop('text')
    description: string = null;

    @Title('Ação')
    @Prop('enum')
    @Enum('Action')
    action: Action = null;

}
