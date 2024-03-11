import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './login/auth.service';
import { ResizeService } from './utils/resize.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    public static showSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public static isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly resizeService: ResizeService,
    ) { }

    public ngOnInit(): void {
        this.authService.showSideBar.subscribe(
            mostrar => AppComponent.showSideBar.next(mostrar)
        );

        this.resizeService.screenWidth$.subscribe(width => {
            AppComponent.showSideBar.next(width < 720);
            AppComponent.isMobile.next(width < 720)
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                // A rota foi alterada, faça o que desejar aqui
                console.log('Rota alterada:', event.url);
            }
            if (event instanceof NavigationEnd) {
                // A rota foi alterada, faça o que desejar aqui
                console.log('Rota alterada:', event.url);
            }
        });

        if (!this.authService.isUserAuthenticated()) {
            this.router.navigate(['/login'])
            return;
        }
    }

}
