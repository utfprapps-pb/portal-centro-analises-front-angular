import { ObjectUtils } from "../utils/object-utils";

export class StorageManager {

    private static readonly useBase64: boolean = true;

    static getItem(key: string): string {
        let data = localStorage.getItem(key);
        if (data != null && this.useBase64) {
            data = atob(data);
        }
        return data;
    }

    static clear(): void {
        localStorage.clear();
    }

    static key(index: number): string {
        let data = localStorage.key(index);
        if (data != null && this.useBase64) {
            data = atob(data);
        }
        return data;
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    static setItem(key: string, value: string): void {
        localStorage.setItem(key, this.useBase64 ? btoa(value) : value);
    }

    static has(key: string): boolean {
        return ObjectUtils.isNotEmpty(localStorage.getItem(key));
    }

}


