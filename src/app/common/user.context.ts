import { Injectable } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'

@Injectable()
export class UserContext {
  userID: number;
  userName: string;
  isAuthenticated: boolean;
  token: string;
  expiryToken: Date;
  constructor() {

    this.userID = null;
    this.userName = '';
    this.isAuthenticated = false;
    this.token = null;
    this.expiryToken = null;
    if (localStorage.getItem('token')) {
      let jwtHelper = new JwtHelper();
      let tkn = localStorage.getItem('token');
      let tknData = jwtHelper.decodeToken(tkn);
      this.isAuthenticated = (tkn != null && !jwtHelper.isTokenExpired(tkn));
      this.userID = tknData.jti;
      this.userName = tknData.sub; //TODO:check username
      this.token = tkn.toString();
      this.expiryToken = jwtHelper.getTokenExpirationDate(tkn);
    }
  }
}