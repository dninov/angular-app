import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AdminService } from "../admin.service";
import { AdminActionTypes, LoadUsersAction, LoadUsersFailureAction, LoadUsersSuccessAction } from "./admin.actions";
import { of } from "rxjs";
@Injectable()
export class AdminEffects {
    loadUsers$ = createEffect(
        () => this.actions$
        .pipe(
            ofType<LoadUsersAction>(AdminActionTypes.LOAD_USERS), 
            mergeMap(
                () => this.adminService.getAllUsers()
                .pipe(
                    map(data => new LoadUsersSuccessAction(data)),
                    catchError(error => of (new LoadUsersFailureAction(error)))
                ),
            ),
        ),
    )
    constructor(
        private actions$: Actions, 
        private adminService: AdminService
        ){}
}