import { Component, ContentChildren, ElementRef, Injector, QueryList, ViewChildren } from '@angular/core';

import { Stack } from '../../utils/models/stack';
import { CompCtrlDirective } from '../compctrl/compctrl.directive';

@Component({
    selector: 'form-base',
    templateUrl: './form-base.component.html',
    styleUrl: './form-base.component.scss'
})
export class FormBaseComponent {

    @ViewChildren('formBase') formBase: QueryList<ElementRef>;
    @ContentChildren(CompCtrlDirective, { descendants: true }) contentFieldsCompCtrlForm: QueryList<CompCtrlDirective>;

    public facades: Stack<number> = new Stack();

    constructor(
        protected readonly injector: Injector
    ) {
    }

    public blockForm(): void {
        this.facades.push(this.facades.size());
    }

    public releaseForm(force: boolean = false): boolean {
        if (force) {
            this.facades.clear();
        } else {
            this.facades.pop();
        }
        return this.facades.isEmpty();
    }

}
