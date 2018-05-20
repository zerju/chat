import {HttpClientModule} from '@angular/common/http';
/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {CoreModule} from './core/core.module';
import {JWTInterceptor} from './core/http-interceptors/jwt.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, AppRoutingModule, ComponentsModule, BrowserAnimationsModule,
    CoreModule, HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
