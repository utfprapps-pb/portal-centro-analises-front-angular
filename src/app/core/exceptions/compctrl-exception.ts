export class CompCtrlException {

    public readonly mapped: boolean = true;
    public errors: Map<String, String> = null;

    constructor(validationErrors: Map<String, String>) {
        this.errors = validationErrors;
    }

}
