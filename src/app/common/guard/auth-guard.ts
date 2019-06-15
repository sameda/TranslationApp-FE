import { CanActivate } from "@angular/router/src/utils/preactivation";
import { Injectable } from "@angular/core";
import { UserContext } from "../user.context";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HelperFunctions } from "app/helper/functions";

@Injectable()
export class AuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    private userContext:UserContext

    constructor( public router: Router) {}

    canActivate(): boolean {
      this.userContext = new UserContext();
      if (!this.userContext.isAuthenticated) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}