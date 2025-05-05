import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';

import { environment } from '../../../environments/environment';
import { UserBalance } from '../../pages/cadastros/user/model/userbalance.model';
import { UserService } from '../../pages/cadastros/user/user.service';
import { Solicitation } from '../../pages/solicitation/model/solicitation.model';
import { Constants } from '../constants/constants';
import { DateHttpInterceptor } from '../handlers/date-handler.interceptor';
import { StorageManager } from '../managers/storage-manager';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private stompClient?: Client;
    private conectado = false;

    public solicitacaoRecebida$ = new Subject<Solicitation>();
    public userBalance$ = new Subject<number>();
    public globalUserBalance$ = new Subject<UserBalance>();

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly dateHandlerInterceptor: DateHttpInterceptor,
    ) {
        this.conectar();
    }

    private conectar() {
        const token = encodeURIComponent(this.authService.getToken());
        const user = encodeURIComponent(btoa(StorageManager.getItem(Constants.USER)));

        const socketUrl = `${environment.websocketUrl}?token=${token}&credentials=${user}`;
        const socket = new SockJS(socketUrl);

        this.stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                'accept-version': '1.2',
                'heart-beat': '10000,10000',
            },
            reconnectDelay: 200,
            // debug: (str) => console.log(str),
        });

        this.stompClient.onConnect = () => {
            console.log('Conectado com sucesso!');
            this.stompClient.subscribe(`/topic/solicitacoes`, (mensagem) => {
                if (mensagem.body) {
                    let body = JSON.parse(mensagem.body);
                    this.dateHandlerInterceptor.deserialize(body);
                    this.solicitacaoRecebida$.next(body);
                }
            });

            this.stompClient.subscribe(`/topic/user/balance/${this.authService.getUserLogged().id}`, (mensagem) => {
                if (mensagem.body) {
                    let body = JSON.parse(mensagem.body);
                    this.dateHandlerInterceptor.deserialize(body);
                    this.userBalance$.next(body);
                }
            });

            this.stompClient.subscribe(`/topic/balance`, (mensagem) => {
                if (mensagem.body) {
                    let body = JSON.parse(mensagem.body);
                    this.dateHandlerInterceptor.deserialize(body);
                    this.globalUserBalance$.next(body);
                }
            });

            this.userService.getBalance();
        };

        this.stompClient.activate();
    }

    public desconectar(): void {
        if (this.conectado && this.stompClient) {
            this.stompClient.deactivate();
            this.conectado = false;
            console.log('[WebSocket] Desconectado');
        }
    }

}
