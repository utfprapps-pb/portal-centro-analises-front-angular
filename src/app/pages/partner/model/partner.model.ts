import { Enum, Prop } from '../../../core/decorators/decorators';
import { StatusAI } from '../../../core/enums/statusai.enum';
import { ZModel } from '../../../generics/zmodel';

export class Partner extends ZModel {

    public static override createInstance(): Partner {
        return new Partner();
    }

    @Prop('text')
    name: string = null;

    @Prop('text')
    cnpj: string = null;

    @Prop('enum')
    @Enum('StatusAI')
    status: StatusAI = StatusAI.ACTIVE;

}
