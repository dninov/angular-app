import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from 'rxjs';  
import { tap, map } from "rxjs/operators";
import { first } from 'rxjs/operators';
import { AuthService } from '../app/auth/auth.service'
@Injectable()
export class GuardService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private as: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.as.isAuthenticated === null || this.as.isAuthenticated === undefined) {
          this.router.navigate(['']); 
          return false;
      } else {
            return true;
           } 
      
  }
}
