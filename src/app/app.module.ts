import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProtectedComponent } from './protected/protected.component';
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {LocalStorageModule} from "angular-2-local-storage";

const appRoutes: Routes = [
  {path: '', component: UserRegistrationComponent, pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'protected', component: ProtectedComponent, canActivate:	[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    ProtectedComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
