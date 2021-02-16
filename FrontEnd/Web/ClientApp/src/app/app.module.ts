import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
   // BrowserAnimationsModule,
        AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }) ,//
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
     HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: RegistrationComponent },
      { path: 'registration', component: RegistrationComponent },
        { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
