import { AdminActionTypes, AdminAction} from './admin.actions';
import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
export interface AdminState {
    list: any[],
    loading: boolean,
    error: Error
}

const initialState: AdminState = {
    list:[],
    loading:false,
    error: {name: "", message: ""}
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
        default:
            return state;
    }
}
export const getAdminState = createFeatureSelector<AdminState>('admin');

export const loadUsers = createSelector(getAdminState, (state: AdminState) => state.loading);
export const loadUsersSuccess = createSelector(getAdminState, (state: AdminState) => state.list);
export const loadUsersFailure = createSelector(getAdminState, (state: AdminState) => state.error);