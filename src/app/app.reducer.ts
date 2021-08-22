import { ActionReducerMap, createFeature, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromAuth from './auth/store/auth.reducer'; 
import * as fromAdmin from './admin/store/admin.reducer'

export interface State {
    auth: fromAuth.AuthState;
    admin: fromAdmin.AdminState;
}

export const reducers: ActionReducerMap<State, any> = {
    auth: fromAuth.AuthReducer,
    admin: fromAdmin.AdminReducer
}

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const loadUser = createSelector(getAuthState, fromAuth.loadUser);
export const loadUserSuccess = createSelector(getAuthState, fromAuth.loadUserSuccess);
export const loadUserFailure = createSelector(getAuthState, fromAuth.loadUserFailure);
export const logout = createSelector(getAuthState, fromAuth.logout);

export const getAdminState = createFeatureSelector<fromAdmin.AdminState>('admin');
export const loadUsers = createSelector(getAdminState, fromAdmin.loadUsers);
export const loadUsersSuccess = createSelector(getAdminState, fromAdmin.loadUsersSuccess);
export const loadUsersFailure = createSelector(getAdminState, fromAdmin.loadUsersFailure);
export const loadReadMessages = createSelector(getAdminState, fromAdmin.loadReadMessages);
export const loadReadMessagesSuccess = createSelector(getAdminState, fromAdmin.loadReadMessagesSuccess);
export const loaReadMessagesFailure = createSelector(getAdminState, fromAdmin.loadReadMessagesFailure);
