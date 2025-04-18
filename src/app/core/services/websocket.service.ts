import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'webstomp-client';

import { environment } from '../../../environments/environment';
import { Solicitation } from '../../pages/solicitation/model/solicitation.model';
import { Constants } from '../constants/constants';
import { StorageManager } from '../managers/storage-manager';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private stompClient?: Stomp.Client;
    private conectado = false;

    public solicitacaoRecebida$ = new Subject<Solicitation>();

    constructor(
        private readonly authService: AuthService
    ) {
        this.conectar();
    }

    private conectar() {
        const token = encodeURIComponent(this.authService.getToken());
        const user = encodeURIComponent(btoa(StorageManager.getItem(Constants.USER)));

        const socket = new WebSocket(`${environment.websocketWSS}://${environment.websocketUrl}?token=${token}&credentials=${user}`);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            console.log('[WebSocket] Conectado');
            this.conectado = true;

            this.stompClient?.subscribe('/topic/solicitacoes', (mensagem) => {
                if (mensagem.body) {
                    this.solicitacaoRecebida$.next(JSON.parse(mensagem.body));
                }
            });
        }, (erro) => {
            console.error('[WebSocket] Erro:', erro);
            this.reconectar();
        });
    }

    private reconectar() {
        console.log('[WebSocket] Tentando reconectar...');
        setTimeout(() => this.conectar(), 1000);
    }

    desconectar() {
        if (this.conectado && this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('[WebSocket] Desconectado');
            });
        }
    }

}
