import { Component, Injector, ViewChild } from '@angular/core';
import { take } from 'rxjs';

import { FormBase } from '../../components/form-base/form-base';
import { FormBaseComponent } from '../../components/form-base/form-base.component';
import { Constants } from '../../core/constants/constants';
import { StorageManager } from '../../core/managers/storage-manager';
import { RecoverPasswordDTO } from '../../dtos/recover-password.dto';
import { ObjectUtils } from '../../utils/object-utils';
import { LoginService } from '../login.service';
import { Login } from '../model/login.model';
import { RegisterUser } from '../model/register-user.model';
import { UserType } from './../../core/enums/user-type.enum';


@Component({
    selector: 'app-login',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent extends FormBase {

    @ViewChild('formView') public override formView: FormBaseComponent;

    public readonly PF: String = 'PF';
    public readonly PJ: String = 'PJ';
    public cpf: string = '';
    public cnpj: string = '';

    public template: 'login' | 'password' | 'confirm' | 'register' = 'login'
    public formTitle: string;
    public subtitle: string;
    public buttonText: string;

    public object: Login = new Login();
    public passwordRecover: RecoverPasswordDTO;
    public passwordConfirm: string = null;

    public newUser: RegisterUser;
    private buscouEmailsAcademicos: boolean = false;
    private emailsAcademicos: string[] = [];

    constructor(
        protected override readonly injector: Injector,
        protected override readonly service: LoginService,
    ) {
        super(injector, service);
        this.changeTemplate('login');
        this.route.queryParams.pipe(take(1)).subscribe(params => {
            if (ObjectUtils.isNotEmpty(params)) {
                const success: boolean = params['success'] == 'true';
                if (success) {
                    this.toastrService.showSuccess(this.formTitle, 'Email validado com Sucesso! Você já pode acessar sua conta!');
                } else {
                    this.toastrService.showError(this.formTitle, 'Erro ao validar de e-mail, solicite um novo código e tente novamente mais tarde!');
                }
                this.router.navigate(['/entrar'], { replaceUrl: true });
            }
        });
    }

    public async changeTemplate(template: 'login' | 'password' | 'confirm' | 'register'): Promise<void> {
        this.blockForm();
        switch (template) {
            case 'login':
                this.formTitle = 'Bem-vindo!';
                this.subtitle = 'Digite seus dados para continuar';
                this.buttonText = 'Entrar';
                break;
            case 'password':
                this.formTitle = 'Esqueci minha senha';
                this.subtitle = '';
                this.buttonText = 'Solicitar nova Senha';
                this.passwordRecover = new RecoverPasswordDTO();
                this.passwordRecover.email = this.object.email;
                break;
            case 'confirm':
                this.formTitle = 'Reenviar e-mail de validação';
                this.subtitle = 'Valide seu e-mail para poder acessar o sistema.';
                this.buttonText = 'Solicitar validação';
                break;
            case 'register':
                try {
                    if (!this.buscouEmailsAcademicos) {
                        await this.service.findParceirosAcademicos().then(async (data) => {
                            this.emailsAcademicos = data;
                            this.buscouEmailsAcademicos = true;
                        })
                    }
                } finally {
                    this.formTitle = 'Criar nova Conta';
                    this.subtitle = 'Seja bem-vindo, registre-se para acessar o sistema!';
                    this.buttonText = 'Cadastrar';
                    this.newUser = new RegisterUser();
                    this.newUser.email = this.object.email;
                    this.newUser.type = UserType.PF;
                }
                break;
        }

        this.template = template;
        this.releaseForm();
    }

    public requerRA(): boolean {
        return ObjectUtils.isNotEmpty(this.newUser.email) && this.emailsAcademicos.find(email => this.newUser.email.endsWith(email)) != undefined;
    }

    public onClickButton(): void {
        switch (this.template) {
            case 'login':
                this.onClickEntrar();
                break;
            case 'password':
                this.onClickEsqueceuSenha();
                break;
            case 'confirm':
                this.onClickRequestValidation();
                break;
            case 'register':
                this.onClickRegisterNewUser();
                break;
        }
    }

    public requestEmailCode(): void {
        const email = this.formView.compCtrlDirectiveService.getDirectives().find(it => it.compCtrl == 'Email');
        if (!email.validate(true)) {
            return;
        }
        this.blockForm();
        this.loginService.sendCodeRecoverPassword(this.passwordRecover.email).then(data => {
            this.releaseForm();
            this.toastrService.showInfo(this.formTitle, data.message);
        }, error => {
            this.releaseForm();
            if (this.hasErrorMapped(error)) {
                this.errorHandler(error);
                email.valid = false;
                email.compCtrlContainer.setInvalidCause([error.error.message]);
                email.setClassInvalid();
                email.setFocus();
            } else {
                this.toastrService.showError(this.formTitle, 'Erro ao enviar código, tente novamente mais tarde!');
            }
        })
    }

    private onClickEntrar(): void {
        if (this.validateForm()) {
            this.blockForm();
            this.loginService.login(this.object).then(data => {
                this.releaseForm()
                StorageManager.setItem(Constants.TOKEN, data.token);
                StorageManager.setItem(Constants.USER, JSON.stringify(data.user));
                this.router.navigate(['/inicio'], { replaceUrl: true });
            }, error => {
                this.releaseForm();
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.formTitle, 'Erro ao realizar login, tente novamente mais tarde!');
                }
            });
        }
    }

    private onClickEsqueceuSenha(): void {
        if (this.validateForm()) {
            this.blockForm();
            const codigo = this.formView.compCtrlDirectiveService.getDirectives().find(it => it.compCtrl == 'Código');
            this.loginService.recoverPassword(this.passwordRecover).then(data => {
                this.toastrService.showSuccess(this.formTitle, data.message);
                this.changeTemplate('login');
                this.object.email = this.passwordRecover.email;
                this.object.password = this.passwordRecover.newPassword;
                this.releaseForm()
            }, error => {
                this.releaseForm();
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                    if (!!error.message && error.message == 'Código inválido') {
                        codigo.valid = false;
                        codigo.compCtrlContainer.setInvalidCause([error.message]);
                        codigo.setClassInvalid();
                        codigo.setFocus();
                    }
                } else {
                    this.toastrService.showError(this.formTitle, 'Erro ao solicitar nova senha, tente novamente mais tarde!');
                }
            });
        }
    }

    private onClickRequestValidation(): void {
        if (this.validateForm()) {
            this.blockForm();
            this.loginService.requestValidation(this.object.email).then(data => {
                this.toastrService.showSuccess(this.formTitle, 'Validação de e-mail enviada com Sucesso!');
                this.changeTemplate('login');
                this.releaseForm()
            }, error => {
                this.releaseForm();
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.formTitle, 'Erro ao solicitar validação de email, tente novamente mais tarde!');
                }
            });
        }
    }

    private onClickRegisterNewUser(): void {
        if (!!this.newUser.type) {
            this.newUser.cpfCnpj = this.newUser.type == this.PF ? this.cpf : this.cnpj;
        }
        if (this.validateForm()) {
            this.blockForm();
            this.loginService.createNewUser(this.newUser).then((data: any) => {
                this.toastrService.showSuccess(this.formTitle, 'Usuário cadastrado com Sucesso!\nUm e-mail foi enviado para realizar a ativação da conta');
                this.changeTemplate('login');
                this.object.email = this.newUser.email;
                this.object.password = this.newUser.password;
                this.releaseForm()
            }, (error: any) => {
                this.releaseForm();
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    this.toastrService.showError(this.formTitle, 'Erro ao cadastrar usuário, tente novamente mais tarde!');
                }
            });
        }
    }

    public onChangeTipoPessoa(): void {
        this.cpf = '';
        this.cnpj = '';
    }

}
