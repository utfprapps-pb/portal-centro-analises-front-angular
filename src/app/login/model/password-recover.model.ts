import { ZModel } from "../../generics/zmodel";

export class PasswordRecover extends ZModel {
    public static override createInstance(): PasswordRecover {
        return new PasswordRecover();
    }

    code: string = null;
    email: string = null;
    newPassword: string = null;
}
