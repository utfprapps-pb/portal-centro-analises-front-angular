import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ConvertUtilsService {

    public getBoolean(value: any, emptyResult: any = true) {
        if ((typeof value === 'string' || value instanceof String) && value == '') {
            return emptyResult;
        } else if (value == 'true' || value == 'T' || value == true) {
            return true;
        } else if (value == 'false' || value == 'F' || value == false) {
            return false;
        } else {
            return emptyResult;
        }
    }

    // public blobToString(blob: Blob): string {
    //     let u, x;
    //     u = URL.createObjectURL(blob);
    //     x = new XMLHttpRequest();
    //     x.open('GET', u, false);
    //     x.send();
    //     URL.revokeObjectURL(u);
    //     return x.responseText;
    // }

    // public base64ToBlob(value: string, blobType: string): Blob {
    //     const byteCharacters = atob(value);
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     const byteArray = new Uint8Array(byteNumbers);
    //     return new Blob([byteArray], { type: blobType });
    // }

    // public base64ToByteArray(base64: string): number[] {
    //     const byteCharacters = atob(base64);
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     return byteNumbers;
    // }

    // public mergeDeep(source: any, target: any): any {
    //     return this.copyObject(target, source);
    // }


    // public cloneObject(obj: any): any {
    //     return this.copyObject(obj);
    // }

    // public copyObject(obj: any, target?: any): any {
    //     let copy;

    //     if (null == obj) { return obj; }

    //     if (obj instanceof Date) {
    //         copy = new Date();
    //         copy.setTime(obj.getTime());
    //         return copy;
    //     } else if (obj instanceof Array) {

    //         copy = [];
    //         for (let i = 0, len = obj.length; i < len; i++) {
    //             copy[i] = this.copyObject(obj[i]);
    //         }
    //         return copy;

    //     } else if (obj instanceof Object) {

    //         if (target != null) {
    //             copy = target;
    //         } else {
    //             copy = {};
    //         }

    //         for (const attr in obj) {
    //             if (obj.hasOwnProperty(attr)) { copy[attr] = this.copyObject(obj[attr]); }
    //         }
    //         return copy;
    //     } else {
    //         return obj;
    //     }
    // }

}
