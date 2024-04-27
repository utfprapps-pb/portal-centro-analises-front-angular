import { Prop } from '../core/decorators/decorators';
import { ZObject } from './zobject';

export abstract class ZModel extends ZObject {

    @Prop('numeric')
    id: number = null;
}
