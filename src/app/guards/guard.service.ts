import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../../app/auth/auth.service'
@Injectable()
export class GuardService {
    constructor(
        private router: Router,
        private as: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const user  = this.as.isAuthenticated;
    if (user === null || user === undefined || !user) {
        this.router.navigate(['']); 
        return false;
    } else {
          return true;
      }  
  }
}
