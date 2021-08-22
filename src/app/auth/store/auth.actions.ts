import { Action } from "@ngrx/store";

export enum AuthActionTypes{
    LOAD_USER          = '[AUTH] Load User',
    LOAD_USER_SUCCESS  = '[AUTH] Load User Success',
    LOAD_USER_FAILURE  = '[AUTH] Load User Failure',
    LOGOUT             = '[AUTH] Logout User',
}

export class LoadUserAction implements Action {
    readonly type = AuthActionTypes.LOAD_USER;
    constructor(public payload: any){}
}
export class LoadUserSuccessAction implements Action {
    readonly type = AuthActionTypes.LOAD_USER_SUCCESS;
    constructor(public payload: any){}
}
export class LoadUserFailureAction implements Action {
    readonly type = AuthActionTypes.LOAD_USER_FAILURE;
    constructor(public payload: Error){}
}
export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AuthAction = 
LoadUserAction | 
LoadUserFailureAction | 
LoadUserSuccessAction |
LogoutAction