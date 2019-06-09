import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { UserRegisterDto } from "app/interface/user/user";

@Injectable()
export class AuthenticationService {

    authenticationUrl = environment.server_url + '/auth/'
    constructor(private http: HttpClient, private router: Router) {

    }

    login(login): Observable<HttpResponse<any>> {
        return this.http.post(this.authenticationUrl + 'login', login, {observe: 'response'});
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl("/login")
    }

    register(userRegisterDto: UserRegisterDto): Observable<HttpResponse<any>>  {
        return this.http.post(this.authenticationUrl + 'registerUser', userRegisterDto, {observe: 'response'})
    }
}