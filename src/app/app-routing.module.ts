import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'entrar',
        pathMatch: 'full',
    },
    {
        path: 'entrar',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'perfil',
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    },
    {
        path: 'configuracao-email',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/email-config/email-config.module').then(m => m.EmailConfigModule),
    },
    {
        path: 'inicio',
        // data: {
        //     authorities: [Roles.ROLE_STUDENT],
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },

];

export const routing = RouterModule.forRoot(routes);
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { };
