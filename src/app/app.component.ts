import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import pageSettings from '../app/core/constants/page-settings';
import { AuthService } from './login/auth.service';
import { ResizeService } from './utils/resize.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly resizeService: ResizeService
    ) { }

    public ngOnInit(): void {
        this.resizeService.screenWidth$.subscribe(width => {
            pageSettings.isMobile = (width < 720);
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                let url: string = event.url;
                const usuarioAutenticado = this.authService.isUserAuthenticated();
                pageSettings.showHeader = !usuarioAutenticado;
                if (usuarioAutenticado) {
                    if (url == '/' || url == '/entrar') {
                        this.router.navigate(['/inicio'], { replaceUrl: true });
                    }
                }
            }
            if (event instanceof NavigationEnd) {
                let url: string = event.url;
                if (url.includes('?')) {
                    url = url.substring(0, url.indexOf('?'));
                }
                if (!this.authService.isUserAuthenticated()) {
                    this.router.navigate(['/entrar'], { replaceUrl: true });
                }
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(it => it.unsubscribe());
    }

}
