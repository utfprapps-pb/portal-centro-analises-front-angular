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
        path: 'vinculos',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/vinculos/studentteacher/studentteacher.module').then(m => m.StudentTeacherModule),
    },

    {
        path: 'dominios',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/cadastros/domain/domain.module').then(m => m.DomainModule),
    },
    {
        path: 'parceiros',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/cadastros/partner/partner.module').then(m => m.PartnerModule),
    },
    {
        path: 'equipamentos',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/cadastros/equipament/equipament.module').then(m => m.EquipamentModule),
    },
    {
        path: 'usuarios',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/cadastros/user/user.module').then(m => m.UserModule),
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
        loadChildren: () => import('./pages/configuracoes/email-config/email-config.module').then(m => m.EmailConfigModule),
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
