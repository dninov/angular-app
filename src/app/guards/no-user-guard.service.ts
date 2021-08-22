import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from 'rxjs';  
import { tap, map } from "rxjs/operators";
import { first } from 'rxjs/operators';
import { AuthService } from '../../app/auth/auth.service'
@Injectable({
  providedIn: 'root'
})
export class NoUserGuardService {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {           
      return new Observable<boolean>(obs => {
          this.as.isAdmin().then( t => {
              if(t === undefined || t === null){

                   obs.next(true)  
              }else if(!t?.claims.admin){
                  this.router.navigate(['/dashboard']);
                  obs.next(false) ;
              }else{
                this.router.navigate(['/admin-dashboard']);
                  obs.next(false) ;
              }
          }).catch(err =>{ 
            console.log(err);
            this.router.navigate(['']);
          })
      })

}
}
