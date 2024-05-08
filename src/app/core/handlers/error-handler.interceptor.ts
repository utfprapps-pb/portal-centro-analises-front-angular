import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ObjectUtils } from '../../utils/object-utils';
import { CompCtrlException } from '../errors/compctrl-exception';
import { GenericException } from '../errors/generic-exception';
import { AuthService } from '../services/auth.service';
import { ToastrService } from '../services/toastr.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private readonly authenticationProvider: AuthService,
        private readonly toastrService: ToastrService
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(null, (err: HttpErrorResponse) => {
                if (ObjectUtils.isNotEmpty(err.error)) {
                    if (!!err.error && err.error.trace && err.error.trace.includes('TokenExpiredException')) {
                        this.authenticationProvider.logout();
                        this.toastrService.showError('Sessão', 'Sessão expirou, Por favor faça login novamente!');
                        throw new GenericException('Sessão expirou, Por favor faça login novamente!');
                    }

                    const mappedMessagePrefix: string = 'mapped|';
                    // Exception Generica que precisa ser tratada por meio do message do erro
                    if (ObjectUtils.isNotEmpty(err.error.message) && (err.error.message as string).startsWith(mappedMessagePrefix)) {
                        err.error['mapped'] = true;
                        const body: string[] = (err.error.message as string).split('|')
                        let newMessage: string = '';
                        for (let i = 2; i < body.length; i++) {
                            newMessage += body[i];
                        }

                        if ('GenericException' == body[1]) {
                            if (newMessage == 'Usuário inválido!') {
                                this.authenticationProvider.logout();
                            }
                            throw new GenericException(newMessage);
                        }
                    } else if (ObjectUtils.isNotEmpty(err.error.validationErrors)) {
                        throw new CompCtrlException(err.error.validationErrors);
                    }
                }

                if (!!err.error && !!err.error.trace) {
                    const message = err.error.trace.substring(0, err.error.trace.indexOf('\r'))
                    if (message.includes('Usuário não encontrado!')) {
                        this.authenticationProvider.logout();
                        throw new GenericException(message);
                    }
                }

                console.error('Error ErrorHandlerInterceptor: ', err);

                // Falha de Conexao com a API...
                // if (err.status === 504) {
                //     if ((err.url.indexOf('/login/logar') <= 0) && (err.url.indexOf('/auth/login') <= 0)) {
                //         this.toastrService.error(this.translateService.instant('msg.erro-sem-conexao'), 'ERP Oniun');
                //     }
                //     return throwError(new Error(this.translateService.instant('msg.erro-sem-conexao')));
                // }

                // Erro na API...
                // if (err.status === 500) {
                //     console.error('Erro API', err);
                // }

                // Erro de Permissao ou Usuario Deslogado...
                // if (err.status === 403 && this.authenticationProvider.isAuthenticated()) {
                //     this.toasterService.simplePop(Toaster3Type.WARNING, this.translateService.instant('msg.usuario-sem-permissao-acesso'));
                // }

                // Erro de Permissao ou Usuario Deslogado...
                // if (err.status === 401) {
                //     if ((err.url.indexOf('/login/logar') <= 0) && (err.url.indexOf('/auth/login') <= 0)) {
                //         this.toasterService.simplePop(Toaster3Type.WARNING, this.translateService.instant('msg.usuario-sem-permissao-acesso'));
                //         // Fechar Todas as Telas Modais Abertas....
                //         this.modalService.closeAll();
                //         // Deslogar o Usuario e Redirecionar para Pagina de Login...
                //         this.authenticationProvider.logout();
                //     }
                //     return throwError(new Error(this.translateService.instant('msg.usuario-sem-permissao-acesso')));
                // }
                // if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes('rest/getInfoToken'))))) {
                //     console.error('Oniun.HttpError 401', err);
                //     this.eventManager.broadcast(new EventWithContent('Oniun.HttpError', err));
                // }
            })
        );
    }

}
