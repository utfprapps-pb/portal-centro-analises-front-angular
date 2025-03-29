import { Injectable } from '@angular/core';

import { CompCtrlDirective } from './compctrl.directive';

@Injectable({
    providedIn: 'root'
})
export class CompCtrlDirectiveService {

    private directives: CompCtrlDirective[] = [];

    register(directive: CompCtrlDirective): void {
        this.directives.push(directive);
    }

    unregister(directive: CompCtrlDirective): void {
        this.directives = this.directives.filter(item => item.compCtrlContainer.id !== directive.compCtrlContainer.id);
    }

    getDirectives(): CompCtrlDirective[] {
        return this.directives;
    }

}
