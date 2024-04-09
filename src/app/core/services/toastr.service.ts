import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastrService {

    constructor(
        private readonly messageService: MessageService
    ) { }

    public showSuccess(title: string, content: string): void {
        this.show(title, content, 'success');
    }

    public showInfo(title: string, content: string): void {
        this.show(title, content, 'info');
    }

    public showWarn(title: string, content: string): void {
        this.show(title, content, 'warn');
    }

    public showError(title: string, content: string): void {
        this.show(title, content, 'error');
    }

    private show(title: string, content: string, severity: 'success' | 'info' | 'warn' | 'error'): void {
        this.messageService.add({ severity: severity, summary: title, detail: content });
    }
}
