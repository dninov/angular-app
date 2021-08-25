import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, takeWhile, tap } from "rxjs/operators";
import { AdminService } from "../admin.service";
import { 
    AdminActionTypes, 
    LoadUsersAction, 
    LoadUsersFailureAction, 
    LoadUsersSuccessAction, 
     } from "./admin.actions";
import { AuthActionTypes ,LogoutAction } from "src/app/auth/store/auth.actions";
import { Observable, of } from "rxjs";
import { ChatService } from "src/app/shared/chat.service";
@Injectable()
export class AdminEffects {
    isLoggedout:boolean = false;


    loadUsers$ = createEffect(
        () => this.actions$
        .pipe(
            ofType<LoadUsersAction>(AdminActionTypes.LOAD_USERS), 
            mergeMap(() => this.adminService.getAllUsers().pipe(takeWhile(val => !this.isLoggedout)).pipe(
                    map(data => new LoadUsersSuccessAction(data)),
                    catchError(error => of (new LoadUsersFailureAction(error))))
            ),
        ),
    )

    logout$ = createEffect(() =>
    this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGOUT),
            tap(action => {
                this.isLoggedout = true;
                console.log('logout effect fired');
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
        private adminService: AdminService,
        private chatService: ChatService
        ){}
}