import { ZModel } from '../../../generics/zmodel';
import { User } from '../../cadastros/user/model/user.model';
import { Project } from './project.model';

export class ProjectStudent extends ZModel {

    public static override createInstance(): ProjectStudent {
        const blank = new ProjectStudent();
        return blank;
    }

    project: Project = null;
    user: User = null;

}

