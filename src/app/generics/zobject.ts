import { ToasterService } from '../core/toaster/toaster.service';
import { ToasterType } from '../core/toaster/toaster.type';

export abstract class ZObject {

    public static createInstance(): ZObject {
        new ToasterService().simplePop(ToasterType.ERROR, 'createInstance not implemented')
        throw new Error('createInstance not implemented');
    }

}
