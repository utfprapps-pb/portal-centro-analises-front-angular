import { ColumnAlign, ColumnMinWidth, Prop, Title } from '../core/decorators/decorators';
import { ZObject } from './zobject';

export abstract class ZModel extends ZObject {

    @Title('Código')
    @Prop('numeric')
    @ColumnAlign('right')
    @ColumnMinWidth('130px')
    id: number = null;
}
