import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ElementoQuimico } from './elemento-quimico.interface';


@Component({
    selector: 'periodic-table-element',
    templateUrl: './periodic-table-element.component.html',
    styleUrl: './periodic-table-element.component.scss',
})
export class PeriodicTableElementComponent {

    @Input('data') elemento: any;

    @Output('onClick') onClickEmitter: EventEmitter<ElementoQuimico> = new EventEmitter<ElementoQuimico>();

    constructor() { }

    public onClick(): void {
        if (!this.elemento.disabled && !this.elemento.blocked && this.elemento.visible) {
            this.onClickEmitter.emit(this.elemento);
        }
    }

    public getDisabledClass(): string {
        const classes = [];
        if (this.elemento.visible) {
            classes.push(this.elemento.category);
            classes.push('disabled')
        }
        return classes.join(' ');
    }

    public getClasses(): string {
        const classes = [];
        if (this.elemento.visible) {
            classes.push(this.elemento.category);
            if (this.elemento.selected) {
                classes.push('glow-' + this.elemento.category);
            }
            if (!this.elemento.disabled && !this.elemento.blocked) {
                classes.push('hoverable');
                classes.push('pointer');
            }
            if (this.elemento.blocked) {
                classes.push('cursor-not-allowed')
            }
        }
        return classes.join(' ');
    }
}
