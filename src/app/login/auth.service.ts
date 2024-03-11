import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public showSideBar = new EventEmitter<boolean>();

    constructor() {

    }

    public isUserAuthenticated(): boolean {
        return false;
    }


}
