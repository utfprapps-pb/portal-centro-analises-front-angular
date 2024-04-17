import { Component, inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ObjectUtils } from '../../utils/object-utils';
import { Constants } from '../constants/constants';
import { Roles } from '../enums/roles.enum';
import { StorageManager } from '../managers/storage-manager';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../toaster/toaster.service';
import { ToasterType } from '../toaster/toaster.type';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(
        private router: Router,
        private authService: AuthService,
        private toasterService: ToasterService,
    ) { }

    public static canActivate: CanActivateFn = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) => {
        return inject(AuthGuard).canActivate(route, state);
    };

    public static canDeactivate(
        component: Component,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('salvou');
        AuthGuard.saveLocation(currentState.url);
        return true;
    }

    private canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    private checkLogin(authorities: string[], url: string): Observable<boolean> {
        return this.authService.identity().pipe(map(
            (account) => {
                if (account) {
                    let allowAccess: boolean = false;
                    if (ObjectUtils.isEmpty(authorities) || (Roles.ROLE_ADMIN == account.role)) {
                        allowAccess = true;
                    }

                    if (this.authService.hasAnyAuthority(authorities)) {
                        allowAccess = true;
                    }

                    if (allowAccess) {
                        return true;
                    }

                    this.toasterService.simplePop(ToasterType.WARNING, "Usuário sem Permissão de Acesso");
                    if (StorageManager.has(Constants.LAST_PAGE)) {
                        this.router.navigate([StorageManager.getItem(Constants.LAST_PAGE)], { replaceUrl: true });
                    }
                }

                this.router.navigate(['entrar']);
                return false;
            }
        ));
    }

    private static saveLocation(hash: string): void {
        StorageManager.setItem(Constants.LAST_PAGE, hash);
    }

}
