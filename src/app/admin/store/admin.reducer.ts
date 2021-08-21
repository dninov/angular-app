import { AdminActionTypes, AdminAction} from './admin.actions';
import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
export interface AdminState {
    list: any[],
    loading: boolean,
    error: Error,
    readMsgList: any[],
    readMsgListLoading: boolean,
    readMsgError: Error,
    newMsgList: any[],
    newMsgListLoading: boolean,
    newMsgError: Error,
}

const initialState: AdminState = {
    list:[],
    loading:false,
    error: {name: "", message: ""},
    readMsgList:[],
    readMsgListLoading:false,
    readMsgError: {name: "", message: ""},
    newMsgList:[],
    newMsgListLoading:false,
    newMsgError: {name: "", message: ""},
}

export function AdminReducer(
    state: AdminState = initialState,
    action: AdminAction,
){
    switch (action.type){
        case AdminActionTypes.LOAD_USERS:
            return {...state,  loading: true};
        case AdminActionTypes.LOAD_USERS_SUCCESS:
            return {...state, list:action.payload, loading:false};
        case AdminActionTypes.LOAD_USERS_FAILURE:
            return {...state, error:action.payload, loading:false};
        case AdminActionTypes.LOAD_READ_MESSAGES:
            return {...state,  readMsgListLoading: true};
        case AdminActionTypes.LOAD_READ_MESSAGES_SUCCESS:
            return {...state, readMsgList:action.payload, readMsgListLoading:false};
        case AdminActionTypes.LOAD_READ_MESSAGES_FAILURE:
            return {...state, readMsgError:action.payload, readMsgListLoading:false};
        case AdminActionTypes.LOAD_NEW_MESSAGES:
            return {...state,  newMsgListLoading: true};
        case AdminActionTypes.LOAD_NEW_MESSAGES_SUCCESS:
            return {...state, newMsgList:action.payload, newMsgListLoading:false};
        case AdminActionTypes.LOAD_NEW_MESSAGES_FAILURE:
            return {...state, newMsgError:action.payload, newMsgListLoading:false};
        default:
            return state;
    }
}
export const getAdminState = createFeatureSelector<AdminState>('admin');

export const loadUsers = createSelector(getAdminState, (state: AdminState) => state.loading);
export const loadUsersSuccess = createSelector(getAdminState, (state: AdminState) => state.list);
export const loadUsersFailure = createSelector(getAdminState, (state: AdminState) => state.error);
export const loadReadMessages = createSelector(getAdminState, (state: AdminState) => state.readMsgListLoading);
export const loadReadMessagesSuccess = createSelector(getAdminState, (state: AdminState) => state.readMsgList);
export const loadReadMessagesFailure = createSelector(getAdminState, (state: AdminState) => state.readMsgError);
export const loadNewMessages = createSelector(getAdminState, (state: AdminState) => state.newMsgListLoading);
export const loadNewMessagesSuccess = createSelector(getAdminState, (state: AdminState) => state.newMsgList);
export const loadNewdMessagesFailure = createSelector(getAdminState, (state: AdminState) => state.newMsgError);