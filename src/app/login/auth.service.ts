import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../../assets/constants';
import { LoginService } from './login/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public showSideBar = new EventEmitter<boolean>();

    constructor(
        private readonly loginService: LoginService,
        private readonly router: Router,
    ) {

    }

    public isUserAuthenticated(): boolean {
        return false;
    }


    public logout(): void {
        localStorage.removeItem(Constants.TOKEN);
        console.log(this.router.url);
        if (this.router.url != '/login') {
            this.router.navigate(['/login'])
        }
    }

}
