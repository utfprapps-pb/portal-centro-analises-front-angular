import { ComponentsModule } from './components/components.module';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './login/auth.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ComponentsModule,
    ],
    providers: [
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
