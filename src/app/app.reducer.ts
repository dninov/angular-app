import { ActionReducerMap, createFeature, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromAuth from './auth/auth.reducer'; 
import * as fromAdmin from './admin/store/admin.reducer'

export interface State {
    auth: fromAuth.State;
    admin: fromAdmin.AdminState;
}

export const reducers: ActionReducerMap<State, any> = {
    auth: fromAuth.authReducer,
    admin: fromAdmin.AdminReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getAdminState = createFeatureSelector<fromAdmin.AdminState>('admin');
export const loadUsers = createSelector(getAdminState, fromAdmin.loadUsers);
export const loadUsersSuccess = createSelector(getAdminState, fromAdmin.loadUsersSuccess);
export const loadUsersFailure = createSelector(getAdminState, fromAdmin.loadUsersFailure);
export const loadReadMessages = createSelector(getAdminState, fromAdmin.loadReadMessages);
export const loadReadMessagesSuccess = createSelector(getAdminState, fromAdmin.loadReadMessagesSuccess);
export const loaReadMessagesFailure = createSelector(getAdminState, fromAdmin.loadReadMessagesFailure);
