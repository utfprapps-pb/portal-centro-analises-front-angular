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
        loadChildren: () => import('./login/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'inicio',
        // data: {
        //     authorities: [Roles.ROLE_STUDENT],
        // },
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },

];

export const routing = RouterModule.forRoot(routes);
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { };
