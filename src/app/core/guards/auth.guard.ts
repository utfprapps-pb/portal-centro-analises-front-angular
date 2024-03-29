import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToasterType } from '../../components/toaster/toaster.type';
import { AuthService } from '../../login/auth.service';
import { ObjectUtils } from '../../utils/object-utils';
import { Constants } from '../constants/constants';
import { Roles } from '../enums/roles.enum';
import { StorageManager } from '../storage-manager';
import { ToasterService } from './../../components/toaster/toaster.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private toasterService: ToasterService,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    private checkLogin(authorities: string[], url: string): Observable<boolean> {
        return this.authService.identity().pipe(map(
            (account) => {
                if (account) {
                    if ((Roles.ROLE_ADMIN == account.role) || ObjectUtils.isEmpty(authorities)) {
                        return true;
                    }

                    if (this.authService.hasAnyAuthority(authorities)) {
                        return true;
                    }

                    this.toasterService.simplePop(ToasterType.WARNING, "Usuário sem Permissão de Acesso");

                    if (StorageManager.has(Constants.LAST_PAGE)) {
                        this.router.navigate([StorageManager.getItem(Constants.LAST_PAGE)], { replaceUrl: true });
                    }
                    return false;
                }

                StorageManager.setItem(Constants.LAST_PAGE, url);
                this.router.navigate(['entrar']);
                return false;
            }
        ));
    }

}
