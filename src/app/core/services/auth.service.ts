import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, ReplaySubject, shareReplay, take, tap } from 'rxjs';

import { UserLoginDTO } from '../../dtos/user-login-dto';
import { ObjectUtils } from '../../utils/object-utils';
import { Constants } from '../constants/constants';
import { StorageManager } from '../managers/storage-manager';
import { DialogService, DialogType } from './dialog.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public static USER_LOGGED: UserLoginDTO = null;

    public showSideBar = new EventEmitter<boolean>();

    public authenticationState: ReplaySubject<UserLoginDTO | null> = new ReplaySubject<UserLoginDTO | null>(1);
    private accountIdentity: UserLoginDTO | null = null;
    public accountCache$?: Observable<UserLoginDTO | null> = null;

    constructor(
        private readonly router: Router,
        private readonly dialogService: DialogService,
    ) {
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

    public logout(requestConfirmation: boolean = false): void {
        if (requestConfirmation) {
            this.dialogService.open({ type: DialogType.QUESTION, message: 'Você realmente deseja sair do sistema?', showCancelButton: false}).then(data => {
                if (!!data) {
                    this.completeLogout();
                }
            })
        } else {
            this.completeLogout();
        }
    }

    private completeLogout(): void {
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

    public getUserLogged(): UserLoginDTO {
        const user = StorageManager.getItem(Constants.USER) || null;
        if (user != null && user != undefined && user != 'null' && user != 'undefined') {
            return JSON.parse(user) || null;
        }
        return null;
    }

    public identity(force?: boolean): Observable<UserLoginDTO | null> {
        if (force || !this.accountCache$ || !this.isUserAuthenticated()) {
            this.accountCache$ = of(this.getUserLogged()).pipe(
                catchError(() => {
                    return of(null);
                }),
                tap(async (account: UserLoginDTO | null) => {
                    if (!account) {
                        this.logout();
                    }
                }),
                shareReplay()
            );
            this.authenticate(this.getUserLogged());
        }
        return this.accountCache$;
    }

    private authenticate(identity: UserLoginDTO | null): void {
        this.accountIdentity = identity;
        this.authenticationState.next(this.accountIdentity);
        AuthService.USER_LOGGED = identity;
    }

    public hasAnyAuthority(authorities: string[]): boolean {
        if (ObjectUtils.isNotEmpty(authorities)) {
            return authorities.indexOf(this.getUserLogged().role) != -1;
        } else {
            return true;
        }
    }

}
