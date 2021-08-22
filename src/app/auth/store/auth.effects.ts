import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { AuthActionTypes, 
    LoadUserAction, 
    LoadUserFailureAction, 
    LoadUserSuccessAction} from "./auth.actions";
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
    loadUser$ = createEffect(
        () => this.actions$
        .pipe(
            ofType<LoadUserAction>(AuthActionTypes.LOAD_USER), 
            mergeMap(
                (data:any) => this.authService.loadUser(data.payload)
                .pipe(
                    map(data => new LoadUserSuccessAction(data)),
                    catchError(error => of (new LoadUserFailureAction(error)))
                ),
            ),
        ),
    )


    constructor(
        private actions$: Actions, 
        private authService: AuthService,
        ){}
}