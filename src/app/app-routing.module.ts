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
        path: 'solicitar',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/solicitar/solicitar.module').then(m => m.SolicitarModule),
    },

    {
        path: 'solicitacoes',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/solicitation/solicitation.module').then(m => m.SolicitationModule),
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
        path: 'projetos',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule),
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
        loadChildren: () => import('./pages/cadastros/equipment/equipment.module').then(m => m.EquipmentModule),
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
        path: 'termos-de-uso',
        // data: {
        //     authorities: [
        //         Roles.ROLE_ADMIN
        //     ]
        // },
        canActivate: [AuthGuard.canActivate],
        canDeactivate: [AuthGuard.canDeactivate],
        loadChildren: () => import('./pages/termsofuse/termsofuse.module').then(m => m.TermsOfUseModule),
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
