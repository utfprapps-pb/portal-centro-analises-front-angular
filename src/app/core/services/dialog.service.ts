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
    showDenyButton?: boolean = true;
    denyButtonText?: string;
    cancelButtonText?: string;
    showCancelButton?: boolean = false;
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
            showCancelButton: options.showCancelButton || false,
            cancelButtonColor: '#ccc',
            cancelButtonText: options.cancelButtonText || 'Cencelar',
            showDenyButton: options.showDenyButton || true,
            denyButtonColor: '#dc3545',
            denyButtonText: options.cancelButtonText || 'Não',
        };

        return swal.mixin(sweetAlertOptions).fire().then((result) => {
            if (result.isConfirmed) {
                return true;
            } else if (result.isDenied) {
                return false;
            } else {
                return null;
            }
        });
    }

}
