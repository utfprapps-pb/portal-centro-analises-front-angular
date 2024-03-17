export abstract class Constants {
    private static readonly useBase64: boolean = true;

    static readonly TOKEN: string = Constants.useBase64 ? btoa('token') : 'token';
    static readonly USER: string = Constants.useBase64 ? btoa('user') : 'user';
}
