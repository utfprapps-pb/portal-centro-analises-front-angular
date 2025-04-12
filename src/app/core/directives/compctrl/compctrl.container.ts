import { Directive, forwardRef, Input } from '@angular/core';

import { Guid } from '../../../utils/models/guid';


@Directive()
export abstract class CompCtrlContainer {

    public static PROVIDER(component: any): any {
        return {
            provide: CompCtrlContainer,
            useExisting: forwardRef(() => component)
        }
    }

    @Input() id: string = Guid.raw();
    internalDisabled: boolean = null;
    @Input() ignoreInternalDisabled: boolean = false;

    abstract getContainer(): any;
    abstract getLabel(): string;
    abstract setRequiredState(value: boolean): void;
    abstract setDisabledState(value: boolean): void;
    abstract setFocus(): void;
    abstract addClass(value: string): void;
    abstract removeClass(value: string): void;
    abstract getValue(): any;
    abstract validate(): string[];
    abstract setInvalidCause(value: string[]): void;
}
