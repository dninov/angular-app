import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap, takeWhile, tap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { AuthActionTypes, 
    LoadUserAction, 
    LoadUserFailureAction, 
    LoadUserSuccessAction,
    LogoutAction,
    LoginAction,
} from "./auth.actions";
import { of } from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthEffects {
    isLoggedout:boolean = false;

    loadUser$ = createEffect(
        () => this.actions$
        .pipe(
            ofType<LoadUserAction>(AuthActionTypes.LOAD_USER), 
            tap((data:any)  => console.log(data)),
            mergeMap(
                (data:any) => this.authService.loadUser(data.payload)
                .pipe(takeWhile(() => !this.isLoggedout))
                .pipe(
                    map(data => new LoadUserSuccessAction(data)),
                    catchError(error => of (new LoadUserFailureAction(error)))
                ),
            ),
        )
    )

    logout$ = createEffect(() =>
    this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGOUT),
            tap(action => {
                this.isLoggedout = true;
            })
        )
    ,{dispatch: false});

    login$ = createEffect(() =>
    this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGIN),
            tap(action => {
                this.isLoggedout = false;
            })
        )
    ,{dispatch: false});

    constructor(
        private actions$: Actions, 
        private authService: AuthService,
        private anfAuth: AngularFireAuth,
        ){}
}