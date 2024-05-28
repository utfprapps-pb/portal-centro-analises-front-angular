import { ColumnAlign, Prop, Title } from '../core/decorators/decorators';
import { ZObject } from './zobject';

export abstract class ZModel extends ZObject {

    @Title('Código')
    @Prop('numeric')
    @ColumnAlign('right')
    id: number = null;
}
