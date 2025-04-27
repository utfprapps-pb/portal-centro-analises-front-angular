import { ZModel } from '../../../generics/zmodel';
import { Finance } from '../../../pages/financeiro/model/finance.model';

export class Attachment extends ZModel {

    public static override createInstance(): Attachment {
        return new Attachment();
    }

    finance: Finance = null;

    fileName: string = null;
    fileHash: string = null;
    contentType: string = null;
    fileSize: number = null;
    url: string = null;
    createdAt: Date = null;
    bucket: string = null;
    index: number = null;


    // Utilizado pelo componente de fileUpload
    upload_process: number = null;
    file: File = null;

}
