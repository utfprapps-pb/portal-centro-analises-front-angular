import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResizeService {

    private screenWidthSubject = new BehaviorSubject<number>(window.innerWidth);
    public screenWidth$ = this.screenWidthSubject.asObservable();

    constructor() {
        // Atualiza o valor da largura da tela quando a janela é redimensionada
        window.addEventListener('resize', () => {
            this.screenWidthSubject.next(window.innerWidth);
        });
    }

}
