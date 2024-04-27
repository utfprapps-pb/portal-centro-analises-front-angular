import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Subscription } from 'rxjs';

import { Roles } from '../../core/enums/roles.enum';
import { AuthService } from '../../core/services/auth.service';
import { UserLoginDTO } from '../../dtos/user-login-dto';

@Component({
    selector: 'HeaderComponent',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {

    @ViewChild('tiredMenu') tiredMenu: TieredMenu;

    public items: MenuItem[] = [];
    private subscriptions: Subscription[] = [];
    public user: UserLoginDTO = null;
    public profileItens: MenuItem[] = [
        {
            label: 'Meu Perfil',
            icon: 'fa fa-user-tie',
            routerLink: 'perfil'
        },
        {
            separator: true,
        },
        {
            label: 'Sair',
            icon: 'fa fa-door-open',
            command: () => {
                this.authentication.logout(true);
            },
        }
    ]

    constructor(
        public readonly authentication: AuthService,
    ) {
        const admin: boolean = this.authentication.getUserLogged().role == Roles.ROLE_ADMIN;
        const professor: boolean = this.authentication.getUserLogged().role == Roles.ROLE_PROFESSOR;
        const student: boolean = this.authentication.getUserLogged().role == Roles.ROLE_STUDENT;
        const external: boolean = this.authentication.getUserLogged().role == Roles.ROLE_EXTERNAL;
        const partner: boolean = this.authentication.getUserLogged().role == Roles.ROLE_PARTNER;

        this.items = this.items = [
            {
                label: 'File',
                icon: 'fa fa-file',
                styleClass: "ms-3",
                command(event) {
                    console.log(event)
                },
            },
            {
                label: 'Configurações',
                icon: 'fa fa-cog',
                items: [
                    {
                        label: 'Config. Email',
                        icon: 'fa fa-envelope',
                        url: '/#/configuracao-email',
                        target: '_self',
                        // visible: admin
                    },
                    {
                        label: 'Domínios',
                        icon: 'far fa-globe',
                        url: '/#/dominios',
                        target: '_self',
                        // visible: admin
                    },
                ]
            }
        ];

        this.subscriptions.push(authentication.authenticationState.subscribe((user: UserLoginDTO) => {
            this.user = user;
        }))
    }

    public ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

}
