export abstract class Constants {
    private static readonly useBase64: boolean = false;

    static readonly TOKEN: string = Constants.useBase64 ? btoa('token') : 'token';
    static readonly USER: string = Constants.useBase64 ? btoa('user') : 'user';
    static readonly LAST_PAGE: string = Constants.useBase64 ? btoa('last_page') : 'last_page';
}
