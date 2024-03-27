export class GenericException {

    constructor(message: string) {
        this.message = message;
    }

    public readonly mapped: boolean = true;
    public message: string = null;

}
