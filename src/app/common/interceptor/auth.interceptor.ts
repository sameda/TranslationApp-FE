import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserContext } from "../user.context";
import 'rxjs/add/operator/do';
import { HelperFunctions } from "app/helper/functions";
import { AuthenticationService } from "app/authentication/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = new UserContext()
    if (user.isAuthenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + user.token,
        }
      });
      
    }
   // return next.handle(request);
    return next.handle(request).do((event: HttpEvent<any>) => {
         
    }, (err: any) => {      
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          HelperFunctions.DisplayConfirmMessage('Session timeout', 'Please login to get a new session').then(resp=>{
            if(resp.value == true){
                this.authService.logout();
            }    
          })            
        }
      }
    });
  }
}
