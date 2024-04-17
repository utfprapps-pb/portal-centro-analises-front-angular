import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastrService {

    constructor(
        private readonly messageService: MessageService
    ) { }

    public showSuccess(title: string, content: string, life?: number): void {
        this.show(title, content, 'success', life);
    }

    public showInfo(title: string, content: string, life?: number): void {
        this.show(title, content, 'info', life);
    }

    public showWarn(title: string, content: string, life?: number): void {
        this.show(title, content, 'warn', life);
    }

    public showError(title: string, content: string, life?: number): void {
        this.show(title, content, 'error', life);
    }

    private show(title: string, content: string, severity: 'success' | 'info' | 'warn' | 'error', life: number = 3000): void {
        this.messageService.add({ severity: severity, summary: title, detail: content, life: life, closable: true });
    }
}
