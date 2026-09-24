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

    public readonly PF: string = 'PF';
    public readonly PJ: string = 'PJ';
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
                        this.emailsAcademicos = await this.service.findParceirosAcademicos();
                        this.buscouEmailsAcademicos = true;
                    }
                } catch (error) {
                    this.toastrService.showError(this.formTitle, 'Erro ao carregar domínios acadêmicos.');
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
    if (!this.newUser?.email) return false;
        return this.emailsAcademicos.some(email => this.newUser.email.endsWith(email));
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
        const email = this.formView.compCtrlDirectiveService.getDirectives().find(it => it.compCtrl === 'userEmailInput');
        if (!email) {
            console.warn('Diretiva do campo de e-mail não encontrada.');
            return;
        }
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
                const backendMessage = error.error?.message;
                if (this.hasErrorMapped(error)) {
                    this.errorHandler(error);
                } else {
                    const mensagemExibicao = backendMessage || 'Erro ao realizar login, tente novamente mais tarde!';
                    this.toastrService.showError(this.formTitle, mensagemExibicao);
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
                    if (!!error.error?.message && error.error.message === 'Código inválido') {
                        if (codigo) {
                            codigo.valid = false;
                            codigo.compCtrlContainer.setInvalidCause([error.error.message]);
                            codigo.setClassInvalid();
                            codigo.setFocus();
                        }
                    }
                } else {
                    this.toastrService.showError(this.formTitle, 'Erro ao solicitar nova senha, tente novamente mais tarde!');
                }
            });
        }
    }

    public onCodeChange(value: string): void {
        if (!this.passwordRecover) return;

        if (!value) {
            this.passwordRecover.code = '';
            return;
        }

        this.passwordRecover.code = value
            .normalize('NFKC')
            .replace(/\D/g, '')
            .substring(0, 6);
    }

    public onPasteCode(event: ClipboardEvent): void {
        event.preventDefault();
        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const pastedText = clipboardData?.getData('text') || '';

        const cleanValue = pastedText
            .normalize('NFKC')
            .replace(/\D/g, '')
            .substring(0, 6);

        if (this.passwordRecover) {
            this.passwordRecover.code = cleanValue;
        }
    }

    public onKeyDownCode(event: KeyboardEvent): void {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
            return;
        }
        
        if (!/^[0-9]$/.test(event.key)) {
            event.preventDefault();
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
                    //Fallback para erros não mapeados 
                    const backendMessage = error.error?.message;
                    const mensagemExibicao = typeof backendMessage === 'string' 
                        ? backendMessage 
                        : 'Erro ao solicitar validação de email, tente novamente mais tarde!';
                    
                    this.toastrService.showError(this.formTitle, mensagemExibicao);
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
