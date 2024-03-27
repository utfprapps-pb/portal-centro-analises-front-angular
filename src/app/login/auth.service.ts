import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, catchError, of, shareReplay, tap } from 'rxjs';

import { Constants } from '../core/constants/constants';
import { StorageManager } from './../core/storage-manager';
import { UserLogin } from './login/model/user-login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public showSideBar = new EventEmitter<boolean>();

    private authenticationState = new ReplaySubject<UserLogin | null>(1);
    private accountIdentity: UserLogin | null = null;
    private accountCache$?: Observable<UserLogin | null> = null;

    constructor(
        private readonly router: Router,
    ) {

    }

    public isUserAuthenticated(): boolean {
        return this.accountIdentity != null;
    }

    public getToken(): string {
        return StorageManager.getItem(Constants.TOKEN);
    }

    public logout(): void {
        localStorage.removeItem(Constants.TOKEN);
        if (this.router.url != '/entrar') {
            this.router.navigate(['/entrar'])
        }
    }

    public getUserLogged(): UserLogin {
        const user = StorageManager.getItem(Constants.USER) || null;
        if (user != null && user != undefined && user != 'null' && user != 'undefined') {
            return JSON.parse(user) || null;
        }
        return null;
    }

    public identity(force?: boolean): Observable<UserLogin | null> {
        if (force || !this.accountCache$ || !this.isUserAuthenticated()) {
            this.accountCache$ = of(this.getUserLogged()).pipe(
                catchError(() => {
                    return of(null);
                }),
                tap(async (account: UserLogin | null) => {
                    if (account) {
                        console.log('identity', account)
                        this.authenticate(account);

                    } else {
                        this.logout();
                    }
                }),
                shareReplay()
            );
        }
        return this.accountCache$;
    }

    private authenticate(identity: UserLogin | null): void {
        this.accountIdentity = identity;
        this.authenticationState.next(this.accountIdentity);
    }

    public hasAnyAuthority(authorities: string[]): boolean {
        return authorities.indexOf(this.getUserLogged().role) != -1;
    }

}
