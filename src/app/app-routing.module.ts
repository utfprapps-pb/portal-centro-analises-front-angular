import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login/login.module').then(m => m.LoginModule),
    },
    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full',
    //     //canActivate: [AuthGuard]
    // },
];

export const routing = RouterModule.forRoot(routes);
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { };
