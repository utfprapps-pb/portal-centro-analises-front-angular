import { Enum, Mask, Prop, Title } from '../../../../core/decorators/decorators';
import { StatusAI } from '../../../../core/enums/statusai.enum';
import { ZModel } from '../../../../generics/zmodel';

export class Partner extends ZModel {

    public static override createInstance(): Partner {
        return new Partner();
    }

    @Title('Nome')
    @Prop('text')
    name: string = null;

    @Title('CNPJ')
    @Prop('text')
    @Mask('cnpj', 'cnpj')
    cnpj: string = null;

    @Title('Status')
    @Prop('enum')
    @Enum('StatusAI')
    status: StatusAI = StatusAI.ACTIVE;

}
