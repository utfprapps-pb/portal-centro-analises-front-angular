import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'modal-component',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {

    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Input() header = '';
    @Input() width = '50vw';
    @Input() height: string = null;
    @Input() draggable = false;
    @Input() resizable = false;

    public onHide() {
        this.visibleChange.emit(false);
    }
}
