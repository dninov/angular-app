import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from 'rxjs';  
import { tap, map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
@Injectable()
export class GuardService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public af: AngularFireAuth) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.af.authState.pipe(
        map(auth => {
            if (auth === null || auth === undefined) {
                this.router.navigate(['']); //Redirect if not authenticated
                return false;
            } else {
              if(auth.getIdTokenResult().then(r=> r.claims.admin === true)){
                return true;
              }else{
                this.router.navigate(['/dashboard']);
                return false;
              }
               
            }
        })
    );
  }
}
