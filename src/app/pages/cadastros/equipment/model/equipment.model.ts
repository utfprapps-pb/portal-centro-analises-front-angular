import { ColumnMinWidth, Enum, Hidden, Prop, Title } from '../../../../core/decorators/decorators';
import { StatusAI } from '../../../../core/enums/statusai.enum';
import { ZModel } from '../../../../generics/zmodel';

export class Equipment extends ZModel {

    public static override createInstance(): Equipment {
        return new Equipment();
    }

    @ColumnMinWidth('250px', '250px')
    @Title('Nome')
    @Prop('text')
    name: string = null;

    @Title('Nome Curto')
    @Prop('text')
    shortName: string = null;

    @Hidden()
    @Title('Modelo')
    @Prop('text')
    model: string = null;

    @Title('UTFPR - $/H', 'center')
    @Prop('currency')
    valueHourUtfpr: number = null;

    @Title('Parceiro - $/H', 'center')
    @Prop('currency')
    valueHourPartner: number = null;

    @Title('Externo - $/H', 'center')
    @Prop('currency')
    valueHourExternal: number = null;

    @ColumnMinWidth('200px')
    @Title('UTFPR - $/Amostra', 'center')
    @Prop('currency')
    valueSampleUtfpr: number = null;

    @ColumnMinWidth('200px')
    @Title('Parceiro - $/Amostra', 'center')
    @Prop('currency')
    valueSamplePartner: number = null;

    @ColumnMinWidth('200px')
    @Title('Externo - $/Amostra', 'center')
    @Prop('currency')
    valueSampleExternal: number = null;

    @Title('Status')
    @Prop('enum')
    @Enum('StatusAI')
    status: StatusAI = null;
}
