import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

export enum DialogType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    INFO = 'info',
    QUESTION = 'question'
}

export class Dialog {
    type: DialogType;
    title?: string;
    message: string;
    html?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    showCancelButton?: boolean = true;
}

@Injectable({ providedIn: 'root' })
export class DialogService {

    public open(options: Dialog): Promise<boolean> {
        if (options.showCancelButton == null || options.showCancelButton == undefined) {
            options.showCancelButton = true;
        }

        const sweetAlertOptions: SweetAlertOptions = {
            title: options.title,
            text: options.message,
            icon: options.type,
            html: options.html,
            focusConfirm: false,
            focusCancel: true,
            showConfirmButton: true,
            confirmButtonColor: '#0dcaf0',
            confirmButtonText: options.confirmButtonText || 'Sim',
            showCancelButton: options.showCancelButton || true,
            cancelButtonColor: '#dc3545',
            cancelButtonText: options.cancelButtonText || 'Não',
        };

        return swal.mixin(sweetAlertOptions).fire().then((result) => {
            return result.isConfirmed;
        });
    }

}
