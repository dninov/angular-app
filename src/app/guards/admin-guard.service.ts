import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from 'rxjs';  
import { tap, map } from "rxjs/operators";
import { first } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class AdminGuardService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private as: AuthService) { }

       canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {           
        return new Observable<boolean>(obs => {
            this.as.isAdmin().then( t => {
                if(t === undefined || t === null){
                    this.router.navigate(['']);
                     obs.next(false) 
                }else if(!t?.claims.admin){
                    console.log('no admin claims');
                    
                    this.router.navigate(['/dashboard']);
                    obs.next(false) 
                }else{
                    obs.next(true) 
                }
            })
        })

 }
}
