import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '../../app/auth/auth.service'
@Injectable()
export class GuardService {
    constructor(
        private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //   const user  = this.authService.isAdmin;
    //   console.log(user);
      
    // if (user === null || user === undefined || !user) {
    //     this.router.navigate(['']); 
    //     return false;
    // } else {
    //       return true; 
    //   }
    return new Observable<boolean>(obs => {
        this.authService.isAdmin().then( t => {
            if(t === undefined || t === null){
                this.router.navigate(['']); 
                obs.next(false);
            }else{
                obs.next(true);
            }
        }).catch(err =>{ 
          console.log(err);
          this.router.navigate(['']);
        })
    })
 
      
  }
}
