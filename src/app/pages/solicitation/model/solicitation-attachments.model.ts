import { SolicitationFileType } from '../../../core/enums/solicitation-file-type.enum';
import { ZModel } from '../../../generics/zmodel';

export class SolicitationAttachments extends ZModel {

    public static override createInstance(): SolicitationAttachments {
        return new SolicitationAttachments();
    }

    fileName: string = null;
    contentType: string = null;
    url: string = null;
    attachments: SolicitationFileType = null;

}
