import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';  
import { AuthService } from './../auth/auth.service';

@Injectable()
export class AdminGuardService {
    constructor(
        private router: Router,
        private as: AuthService) { }

       canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {           
        return new Observable<boolean>(obs => { 
            this.as.isAdmin().then( t => {
                if(t === undefined || t === null){
                    this.router.navigate(['']);
                     obs.next(false) 
                }else if(!t?.claims.admin){
                    this.router.navigate(['/dashboard']);
                    obs.next(false) 
                }else{
                    obs.next(true) 
                }
            }).catch(err => {
                console.log(err);
                this.router.navigate(['']);
            });
        })

 }
}
