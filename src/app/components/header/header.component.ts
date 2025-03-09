import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Subscription } from 'rxjs';

import pageSettings from '../../core/constants/page-settings';
import { Roles } from '../../core/enums/roles.enum';
import { AuthService } from '../../core/services/auth.service';
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
                label: 'Formulários',
                icon: 'far fa-file-lines',
                url: '/#/solicitar',
                target: '_self',
                // visible: admin
            },
            {
                label: 'Solicitações',
                icon: 'far fa-table-tree',
                url: '/#/solicitacoes',
                target: '_self',
                // visible: admin
            },
            {
                label: 'Vínculos Existentes',
                icon: 'fa fa-chalkboard-user',
                url: '/#/vinculos',
                target: '_self',
                // visible: admin
            },
            {
                label: 'Projetos',
                icon: 'fa fa-diagram-project',
                url: '/#/projetos',
                target: '_self',
                // visible: admin
            },
            {
                label: 'Cadastros',
                icon: 'fa fa-plus',
                items: [
                    {
                        label: 'Domínios',
                        icon: 'far fa-globe',
                        url: '/#/dominios',
                        target: '_self',
                        // visible: admin
                    },
                    {
                        label: 'Equipamentos',
                        icon: 'fa fa-dryer-heat',
                        url: '/#/equipamentos',
                        target: '_self',
                        // visible: admin
                    },
                    {
                        label: 'Parceiros',
                        icon: 'fa fa-handshake-simple',
                        url: '/#/parceiros',
                        target: '_self',
                        // visible: admin
                    },
                    {
                        label: 'Usuários',
                        icon: 'far fa-person',
                        url: '/#/usuarios',
                        target: '_self',
                        // visible: admin
                    },
                    {
                        label: 'Termos de Uso',
                        icon: 'fa fa-diploma',
                        url: '/#/termos-de-uso',
                        target: '_self',
                        // visible: admin
                    }
                ]
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
                    }
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

    private onClickChangePassword(): void {
        this.isVisibleModalChangePassword = true;
        this.changePassword = new ChangePasswordDTO();
        this.passwordConfirm = null;
    }

    public onClickCancloseModalChangePassword(): void {
        this.isVisibleModalChangePassword = false;
    }

}
