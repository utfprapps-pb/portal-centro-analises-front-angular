import { ZModel } from '../../generics/zmodel';

export class RegisterUser extends ZModel {
    public static override createInstance(): RegisterUser {
        return new RegisterUser();
    }

    name: string = null;
    email: string = null;
    password: string = null;
}
