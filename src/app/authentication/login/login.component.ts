import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HelperFunctions } from 'app/helper/functions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  login: any = {
    username: "",
    password: ""
  };
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this.authenticationService.login(this.login).subscribe(resp => {
      if(resp.status == 200) {
        // HelperFunctions.showNotification('bottom', 'right', 'Successfully logged in', 'success')
        localStorage.setItem('token', resp.body.access_token);
        this.router.navigate(['']);
      }
    }, err => {
        HelperFunctions.showNotification('bottom', 'right', err.error.detailedMessage, 'danger')
    })
  }

}
