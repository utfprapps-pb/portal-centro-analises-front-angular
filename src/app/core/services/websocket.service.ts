import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';

import { environment } from '../../../environments/environment';
import { Solicitation } from '../../pages/solicitation/model/solicitation.model';
import { Constants } from '../constants/constants';
import { StorageManager } from '../managers/storage-manager';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private stompClient?: Client;
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

        const socketUrl = `${environment.websocketUrl}/ws?token=${token}&credentials=${user}`;
        const socket = new SockJS(socketUrl);

        this.stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                'accept-version': '1.2',
                'heart-beat': '10000,10000',
            },
            reconnectDelay: 1000,
            debug: (str) => console.log(str),
        });

        this.stompClient.onConnect = () => {
            console.log('Conectado com sucesso!');
            this.stompClient.subscribe('/topic/solicitacoes', (mensagem) => {
                if (mensagem.body) {
                    this.solicitacaoRecebida$.next(JSON.parse(mensagem.body));
                }
            });
        };

        this.stompClient.activate();
    }

    desconectar() {
        if (this.conectado && this.stompClient) {
            this.stompClient.deactivate();
            this.conectado = false;
            console.log('[WebSocket] Desconectado');
        }
    }

}
