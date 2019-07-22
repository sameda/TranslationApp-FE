import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HelperFunctions } from 'app/helper/functions';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  login: any = {
    username: "",
    password: "",
    captchaResponse: ""
  };
  loading = false;

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
    ) { }

  ngOnInit() {

  }

  secureWithCaptcha(){
    this.loading = true;
    this.recaptchaV3Service.execute('action').subscribe(token => {    
      this.loginUser(token);
      }
      , err => {
        this.loading = false;
       });
  }
    
  
  loginUser(token){   
    this.login.captchaResponse = token;
    this.authenticationService.login(this.login).subscribe(resp => {
      if(resp.status == 200) {
        // HelperFunctions.showNotification('bottom', 'right', 'Successfully logged in', 'success')
        localStorage.setItem('token', resp.body.access_token);
        this.router.navigate(['/dashboard']);
      }
    }, err => {
        this.loading = false
        HelperFunctions.showNotification('bottom', 'right', err.error.detailedMessage, 'danger')
    }, () => this.loading = false)
  }

}
