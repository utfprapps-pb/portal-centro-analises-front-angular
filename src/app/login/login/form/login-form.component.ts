import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { AppComponent } from './../../../app.component';
import { ResizeService } from './../../../utils/resize.service';

@Component({
    selector: 'app-login',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public isMobile: boolean = false;

    constructor(private resizeService: ResizeService) { }

    public ngOnInit(): void {
        AppComponent.isMobile.subscribe(value => {
            this.isMobile = value;
        });
    }

    public ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            try {
                sub.unsubscribe();
            } catch (ignored) { }
        }
    }

}
