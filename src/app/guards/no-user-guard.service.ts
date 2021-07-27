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

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user  = this.as.isAuthenticated;
  if (user === null || user === undefined || !user) {
    console.log('guard is active');    
      return true;
  } else {
    this.router.navigate(['/dashboard']); 
        return false;
       }  
  
}
}
