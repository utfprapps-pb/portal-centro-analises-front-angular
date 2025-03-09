import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import Quill from 'quill';


@Directive({
    selector: '[quillReader]'
})
export class QuillReaderDirective implements AfterViewInit {
    @Input('quillReader') content: string = '';

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        const quill = new Quill(this.el.nativeElement, {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            }
        });

        const editor = quill.container.querySelector('.ql-editor');
        if (!!editor) {
            editor.classList.remove('ql-blank');
            editor.innerHTML = this.content;
        }
    }
}
