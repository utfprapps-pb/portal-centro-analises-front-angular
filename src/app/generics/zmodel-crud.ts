import { User } from '../pages/cadastros/user/model/user.model';
import { ZModel } from './zmodel';

export abstract class ZModelCrud extends ZModel {

    createdBy: User = null;
    createdAt: Date = null;
    updatedBy: User = null;
    updatedAt: Date = null;
}
