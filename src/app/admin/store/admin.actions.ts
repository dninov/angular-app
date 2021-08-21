import { Action } from "@ngrx/store";

export enum AdminActionTypes{
    LOAD_USERS                 = '[ADMIN] Load Users',
    LOAD_USERS_SUCCESS         = '[ADMIN] Load Users Success',
    LOAD_USERS_FAILURE         = '[ADMIN] Load Users Failure',
    LOAD_READ_MESSAGES         = '[ADMIN] Load Read Messages',
    LOAD_READ_MESSAGES_SUCCESS = '[ADMIN] Load Read Messages Success',
    LOAD_READ_MESSAGES_FAILURE = '[ADMIN] Load Read Messages Failure',
    LOAD_NEW_MESSAGES         = '[ADMIN] Load New Messages',
    LOAD_NEW_MESSAGES_SUCCESS = '[ADMIN] Load New Messages Success',
    LOAD_NEW_MESSAGES_FAILURE = '[ADMIN] Load New Messages Failure',
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
export class LoadReadMessagesAction implements Action {
    readonly type = AdminActionTypes.LOAD_READ_MESSAGES;
    constructor(public payload: any){}
}
export class LoadReadMessagesSuccessAction implements Action {
    readonly type = AdminActionTypes.LOAD_READ_MESSAGES_SUCCESS;
    constructor(public payload: any){}
}
export class LoadReadMessagesFailureAction implements Action {
    readonly type = AdminActionTypes.LOAD_READ_MESSAGES_FAILURE;
    constructor(public payload: Error){}
}
export class LoadNewMessagesAction implements Action {
    readonly type = AdminActionTypes.LOAD_NEW_MESSAGES;
}
export class LoadNewMessagesSuccessAction implements Action {
    readonly type = AdminActionTypes.LOAD_NEW_MESSAGES_SUCCESS;
    constructor(public payload: any){}
}
export class LoadNewMessagesFailureAction implements Action {
    readonly type = AdminActionTypes.LOAD_NEW_MESSAGES_FAILURE;
    constructor(public payload: Error){}
}

export type AdminAction = 
LoadUsersAction | 
LoadUsersFailureAction | 
LoadUsersSuccessAction |
LoadReadMessagesAction |
LoadReadMessagesSuccessAction |
LoadReadMessagesFailureAction |
LoadNewMessagesAction |
LoadNewMessagesSuccessAction |
LoadNewMessagesFailureAction;