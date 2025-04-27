import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Subscription } from 'rxjs';

import pageSettings from '../../core/constants/page-settings';
import { Roles } from '../../core/enums/roles.enum';
import { AuthService } from '../../core/services/auth.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { ChangePasswordDTO } from '../../dtos/change-password.dto';
import { UserLoginDTO } from '../../dtos/user-login-dto';
import { InputPasswordComponent } from '../inputs/input-password/input-password.component';

@Component({
    selector: 'HeaderComponent',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {

    @ViewChild('tiredMenu') tiredMenu: TieredMenu;

    @ViewChild('inputSenhaAtual') inputSenhaAtual: InputPasswordComponent;
    @ViewChild('inputNovaSenha') inputNovaSenha: InputPasswordComponent;
    @ViewChild('inputConfirmacaoNovaSenha') inputConfirmacaoNovaSenha: InputPasswordComponent;

    public isVisibleModalChangePassword: boolean = false;
    public changePassword: ChangePasswordDTO = new ChangePasswordDTO();
    public passwordConfirm: string = null;

    public pageSettings = pageSettings;
    private subscriptions: Subscription[] = [];

    public items: MenuItem[] = [];
    public user: UserLoginDTO = null;
    public profileItens: MenuItem[] = [
        {
            label: 'Meu Perfil',
            icon: 'fa fa-user-tie',
            routerLink: 'perfil'
        },
        {
            label: 'Alterar Senha',
            icon: 'fa fa-lock',
            command: () => {
                this.onClickChangePassword();
            },
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

    public user_balance: number = 0;

    constructor(
        public readonly authentication: AuthService,
        public readonly ws: WebsocketService
    ) {
        const admin: boolean = this.authentication.getUserLogged().role == Roles.ROLE_ADMIN;
        const professor: boolean = this.authentication.getUserLogged().role == Roles.ROLE_PROFESSOR;
        const aluno: boolean = this.authentication.getUserLogged().role == Roles.ROLE_STUDENT;

        this.items = this.items = [
            {
                label: 'Formulários',
                icon: 'far fa-file-lines',
                url: '/#/solicitar',
                target: '_self',
            },
            {
                label: 'Solicitações',
                icon: 'far fa-table-tree',
                url: '/#/solicitacoes',
                target: '_self',
            },
            {
                label: 'Vínculos Existentes',
                icon: 'fa fa-chalkboard-user',
                url: '/#/vinculos',
                target: '_self',
                visible: admin || professor || aluno
            },

            {
                label: 'Projetos',
                icon: 'fa fa-diagram-project',
                visible: !admin,
                url: '/#/projetos',
                target: '_self'
            },
            {
                label: 'Cadastros',
                icon: 'fa fa-plus',
                visible: admin,
                items: [
                    {
                        label: 'Projetos',
                        icon: 'fa fa-diagram-project',
                        url: '/#/projetos',
                        target: '_self',
                    },
                    {
                        label: 'Domínios',
                        icon: 'far fa-globe',
                        url: '/#/dominios',
                        target: '_self',
                    },
                    {
                        label: 'Equipamentos',
                        icon: 'fa fa-dryer-heat',
                        url: '/#/equipamentos',
                        target: '_self',
                    },
                    {
                        label: 'Parceiros',
                        icon: 'fa fa-handshake-simple',
                        url: '/#/parceiros',
                        target: '_self',
                    },
                    {
                        label: 'Usuários',
                        icon: 'far fa-person',
                        url: '/#/usuarios',
                        target: '_self',
                    },
                    {
                        label: 'Termos de Uso',
                        icon: 'fa fa-diploma',
                        url: '/#/termos-de-uso',
                        target: '_self',
                    }
                ]
            },
            {
                label: 'Financeiro',
                icon: 'fa fa-money-bill-transfer',
                visible: true,
                url: '/#/financeiro',
                target: '_self'
            },
            {
                label: 'Config. Email',
                icon: 'fa fa-envelope',
                url: '/#/configuracao-email',
                target: '_self',
                visible: admin
            }
        ];

        this.subscriptions.push(authentication.authenticationState.subscribe((user: UserLoginDTO) => {
            this.user = user;
        }));

        this.subscriptions.push(
            this.ws.userBalance$.subscribe((balance: number) => {
                this.user_balance = balance;
            })
        );
    }

    public ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private onClickChangePassword(): void {
        this.isVisibleModalChangePassword = true;
        this.changePassword = new ChangePasswordDTO();
        this.passwordConfirm = null;
    }

    public onClickCancloseModalChangePassword(): void {
        this.isVisibleModalChangePassword = false;
    }

}
