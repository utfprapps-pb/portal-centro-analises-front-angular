import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { ToasterType } from './toaster.type';

@Injectable({ providedIn: 'root' })
export class ToasterService {

    public simplePop(type: ToasterType, text: string, config?: SweetAlertOptions): void {
        let options: SweetAlertOptions = null;

        if (config) {
            options = config;
        } else {
            options = {
                toast: true,
                position: 'top',
                title: text,
                icon: type
            }

            if (type === ToasterType.INFO || type === ToasterType.SUCCESS) {
                options.showConfirmButton = false;
                options.timer = 3000;
            } else {
                options.showConfirmButton = true;
            }
        }

        swal.mixin(options).fire(options);
    }

    public alertValidateForm(type: ToasterType, html: string): void {
        const options: SweetAlertOptions = {
            position: 'center',
            icon: type,
            html: html,
            showConfirmButton: true,
            showCloseButton: false,
            focusConfirm: false,
            width: '750px'
        };

        swal.mixin(options).fire(options);
    }

}
