import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AdminService } from "../admin.service";
import { AdminActionTypes, 
    LoadUsersAction, 
    LoadUsersFailureAction, 
    LoadUsersSuccessAction, 
    LoadReadMessagesAction, 
    LoadReadMessagesSuccessAction,
    LoadReadMessagesFailureAction } from "./admin.actions";
import { of } from "rxjs";
import { ChatService } from "src/app/shared/chat.service";
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
    loadReadMessages$ = createEffect(
        () => this.actions$
        .pipe(
            ofType<LoadReadMessagesAction>(AdminActionTypes.LOAD_READ_MESSAGES), 
            mergeMap(
                (data:any) => this.chatService.getMessages(data.payload)
                .pipe(
                    map(data => new LoadReadMessagesSuccessAction(data)),
                    catchError(error => of (new LoadReadMessagesFailureAction(error))) 
                ),
            ),
        ),
    )

    constructor(
        private actions$: Actions, 
        private adminService: AdminService,
        private chatService: ChatService
        ){}
}