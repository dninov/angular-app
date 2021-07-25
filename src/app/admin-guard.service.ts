import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from 'rxjs';  
import { tap, map } from "rxjs/operators";
import { first } from 'rxjs/operators';
import { AuthService } from '../app/auth/auth.service'
@Injectable()
export class AdminGuardService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private as: AuthService) { }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       //console.log(this.as.isAdmin());
       
       return true;
      // const isAdmin =  await this.as.isAdmin();
      
      // if(isAdmin === true){
      //   return true;
      // }else{
      //   this.router.navigate(['/dashboard']);
      //   return false;
  //     }
 }
}
