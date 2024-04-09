import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Subscription } from 'rxjs';
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
            label: 'Config. Email',
            icon: 'fa fa-envelope'
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
        this.items =  this.items = [
            {
                label: 'File',
                icon: 'fa fa-file',
                styleClass: "ms-3",
                command(event) {
                    console.log(event)
                },
            },
            {
                label: 'Edit',
                icon: 'fa fa-pencil',
                disabled: true
            },
            {
                label: 'Users',
                icon: 'fa fa-user',
                visible: false,
            },
            {
                label: 'Events',
                icon: 'fa fa-calendar',
            },
            {
                label: 'Quit',
                icon: 'fa fa-power-off',
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
