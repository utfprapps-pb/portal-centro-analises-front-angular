import { ToasterService } from '../core/toaster/toaster.service';
import { ToasterType } from '../core/toaster/toaster.type';
import { GenericObject } from './generic-interface';

export abstract class ZObject implements GenericObject {

    [key: string]: any;

    public static createInstance(): ZObject {
        new ToasterService().simplePop(ToasterType.ERROR, 'createInstance not implemented')
        throw new Error('createInstance not implemented');
    }

}
