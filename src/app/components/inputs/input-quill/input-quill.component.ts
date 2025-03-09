import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Editor, EditorInitEvent, EditorTextChangeEvent } from 'primeng/editor';
import Quill from 'quill';

import { CompCtrlContainer } from '../../../core/directives/compctrl/compctrl.container';
import { InvalidInfoComponent } from '../../invalid-info/invalid-info.component';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
    selector: 'input-quill',
    templateUrl: './input-quill.component.html',
    styleUrls: ['../input-base/input-base.component.scss', './input-quill.component.scss'],
    providers: [
        InputBaseComponent.CONTROL(InputQuillComponent),
        CompCtrlContainer.PROVIDER(InputQuillComponent)
    ],
})
export class InputQuillComponent extends InputBaseComponent {

    @ViewChild('input') component: Editor;
    @ViewChild('invalid') invalidInfoComponent: InvalidInfoComponent;

    @Input() style: { [klass: string]: any; } = {};
    @Output() html: EventEmitter<string> = new EventEmitter();

    override getContainer(): any {
        return this.component?.quill?.container;
    }

    override setFocus() {
        if (!!this.invalidInfoComponent) {
            this.invalidInfoComponent.show();
        }
        this.component.quill.container.focus();
    }

    public onTextChange(ev: EditorTextChangeEvent): void {
        this.innerValue = ev?.htmlValue || null;
    }

    public override setInvalidCause(value: string[]): void {
        super.setInvalidCause(value);
        if (!!this.invalidInfoComponent) {
            const quill: Quill = this.component.getQuill();
            quill.focus();
        }
    }

    public override writeValue(value: any): void {
        this.innerValue = value;
    }

    public onQuillInit(quillEvent: EditorInitEvent): void {
        const quill: Quill = quillEvent.editor;
        console.log(quill.editor);

        if (!!this.innerValue) {
            const editor = quill.container.querySelector('.ql-editor');
            if (!!editor) {
                editor.classList.remove('ql-blank');
                editor.innerHTML = this.innerValue;
            }
        }
    }
}
