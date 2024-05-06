import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'datatable-header-button',
    templateUrl: './datatable-header-button.component.html',
    styleUrl: './datatable-header-button.component.scss'
})
export class DatatableHeaderButtonComponent {

    @Input('icon') icon: string = '';
    @Input('loading') loading: boolean = false;
    @Input('disabled') disabled: boolean = false;

    @Output('onClick') onClickEmitter: EventEmitter<MouseEvent> = new EventEmitter();

    public onClick(event: MouseEvent) {
        if (!this.disabled) {
            this.onClickEmitter.emit(event);
        }
    }

}
