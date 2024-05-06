import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ConvertUtilsService {

    public getBoolean(value: any, valueNull: any = true) {
        if ((typeof value === 'string' || value instanceof String) && value == '') {
            return true;
        } else if (value == 'true' || value == 'T' || value == true) {
            return true;
        } else if (value == 'false' || value == 'F' || value == false) {
            return false;
        } else {
            return valueNull;
        }
    }

    public cloneObject(obj: any, target?: any): any {
        let copy;

        if (null == obj) { return obj; }

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } else if (obj instanceof Array) {

            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObject(obj[i]);
            }
            return copy;

        } else if (obj instanceof Object) {
            if (target != null) {
                copy = target;
            } else {
                copy = {};
            }

            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) { copy[attr] = this.cloneObject(obj[attr]); }
            }
            return copy;
        } else {
            return obj;
        }
    }

}
