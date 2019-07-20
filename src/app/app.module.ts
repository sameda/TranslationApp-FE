import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './common/guard/auth-guard';
import { UserContext } from './common/user.context';
import { RegisterComponent } from './authentication/register/register.component';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { AuthInterceptor } from './common/interceptor/auth.interceptor';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { UserService } from './service/user.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { Constants } from './helper/constant/constants';
import { FirstPageComponent } from './website/first-page.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FullCalendarModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FirstPageComponent

  ],
  providers: [AuthenticationService, UserService, AuthGuard, UserContext,
     // {
    //     provide: RECAPTCHA_SETTINGS,
    //     useValue: { siteKey: 'xxxx' } as RecaptchaSettings,
    //   },
  
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: Constants.CaptchaSiteKey},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },],
    exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
