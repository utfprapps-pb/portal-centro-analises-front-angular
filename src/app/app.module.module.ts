import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ApiHandlerInterceptor } from './core/handlers/api-handler.interceptor';
import { AuthInterceptor } from './core/handlers/auth-handler.interceptor';
import { DateHttpInterceptor } from './core/handlers/date-handler.interceptor';
import { ErrorHandlerInterceptor } from './core/handlers/error-handler.interceptor';
import { AuthService } from './core/services/auth.service';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ComponentsModule,
        ToastModule,
        MessagesModule,
    ],
    providers: [
        AuthService,
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHandlerInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DateHttpInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ]
})
export class AppModule { }
