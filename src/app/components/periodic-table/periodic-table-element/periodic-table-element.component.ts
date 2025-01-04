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
        this.onClickEmitter.emit(this.elemento);
    }

    public getClasses(): string {
        return `${this.elemento.category} ${this.elemento.selected ? ('glow-' + this.elemento.category) : ''}`;
    }
}
