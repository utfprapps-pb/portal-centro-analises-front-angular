import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription, catchError, fromEvent, of, shareReplay, take, tap } from 'rxjs';

import { ToasterType } from '../components/toaster/toaster.type';
import { Constants } from '../core/constants/constants';
import { ObjectUtils } from '../utils/object-utils';
import { ToasterService } from './../components/toaster/toaster.service';
import { StorageManager } from './../core/storage-manager';
import { UserLogin } from './login/model/user-login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    public showSideBar = new EventEmitter<boolean>();

    private authenticationState: ReplaySubject<UserLogin | null> = new ReplaySubject<UserLogin | null>(1);
    private accountIdentity: UserLogin | null = null;
    private accountCache$?: Observable<UserLogin | null> = null;
    private localStorageChanges: Subscription;

    constructor(
        private readonly router: Router,
        private readonly toasterService: ToasterService,
    ) {
        this.localStorageChanges = fromEvent<StorageEvent>(window, 'storage').subscribe(it => {
            if (it.key == null) {
                this.logout();
            } else {
                const preventKeys: string[] = [Constants.USER, Constants.TOKEN, Constants.LAST_PAGE];
                if (preventKeys.indexOf(it.key) != -1) {
                    this.toasterService.simplePop(ToasterType.ERROR, 'Você não pode fazer isso!!');
                    localStorage.setItem(it.key, it.oldValue);
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.localStorageChanges.unsubscribe();
    }

    public isUserAuthenticated(): boolean {
        if (this.accountIdentity == null && ObjectUtils.isNotEmpty(this.getToken())) {
            this.identity(true);
            this.accountCache$.pipe(take(1)).subscribe();
            this.authenticationState.pipe(take(1)).subscribe();
        }
        return this.accountIdentity != null;
    }

    public getToken(): string {
        return StorageManager.getItem(Constants.TOKEN);
    }

    public logout(): void {
        this.limpaStorage();
        this.authenticationState.next(null);
        this.accountIdentity = null;
        this.router.navigate(['/entrar'], { replaceUrl: true })
    }

    private limpaStorage(): void {
        StorageManager.removeItem(Constants.TOKEN);
        StorageManager.removeItem(Constants.USER);
        StorageManager.removeItem(Constants.LAST_PAGE);
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
