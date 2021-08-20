import { Action } from "@ngrx/store";

export enum AdminActionTypes{
    LOAD_USERS = '[ADMIN] Load Users',
    LOAD_USERS_SUCCESS = '[ADMIN] Load Users Success',
    LOAD_USERS_FAILURE = '[ADMIN] Load Users Failure',
}

export class LoadUsersAction implements Action {
    readonly type = AdminActionTypes.LOAD_USERS;
}
export class LoadUsersSuccessAction implements Action {
    readonly type = AdminActionTypes.LOAD_USERS_SUCCESS;
    constructor(public payload: any){}
}
export class LoadUsersFailureAction implements Action {
    readonly type = AdminActionTypes.LOAD_USERS_FAILURE;
    constructor(public payload: Error){}
}

export type AdminAction = LoadUsersAction | LoadUsersFailureAction | LoadUsersSuccessAction;