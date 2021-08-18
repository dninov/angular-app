import { ActionReducerMap, createFeature, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromAuth from './auth/auth.reducer'; 

export interface State {
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State, any> = {
    auth: fromAuth.authReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
