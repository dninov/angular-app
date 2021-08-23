import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { AuthActionTypes, 
    LoadUserAction, 
    LoadUserFailureAction, 
    LoadUserSuccessAction} from "./auth.actions";
import { of } from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthEffects {
    loadUser$ = createEffect(
        () => this.actions$
        .pipe(
            ofType<LoadUserAction>(AuthActionTypes.LOAD_USER), 
            tap((data:any)  => console.log(data)),
            mergeMap(
                (data:any) => this.authService.loadUser(data.payload)
                .pipe(
                    map(data => new LoadUserSuccessAction(data)),
                    catchError(error => of (new LoadUserFailureAction(error)))
                ),
            ),
        )
    )
    constructor(
        private actions$: Actions, 
        private authService: AuthService,
        private anfAuth: AngularFireAuth,
        ){}
}