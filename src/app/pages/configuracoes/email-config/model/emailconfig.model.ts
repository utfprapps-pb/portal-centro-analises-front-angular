import { ZModel } from '../../../../generics/zmodel';

export class EmailConfig extends ZModel {
    public static override createInstance(): EmailConfig {
        return new EmailConfig();
    }

    email: String = null;
    password: String = null;
    host: String = null;
    port: number = null;
}
