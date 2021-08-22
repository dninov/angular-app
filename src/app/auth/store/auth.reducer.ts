import { AuthActionTypes, AuthAction} from './auth.actions';
import { createFeature, createFeatureSelector, createSelector, State } from '@ngrx/store';
export interface AuthState {
    loading: boolean,
    user: any,
    error: Error,
}

const initialState: AuthState = {
    loading: false,
    user: {},
    error: {name: "", message: ""},
}

export function AuthReducer(
    state: AuthState = initialState,
    action: AuthAction,
){
    switch (action.type){
        case AuthActionTypes.LOAD_USER:
            return {...state,  loading: true};
        case AuthActionTypes.LOAD_USER_SUCCESS:
            return {...state, user:action.payload, loading:false};
        case AuthActionTypes.LOAD_USER_FAILURE:
            return {...state, error:action.payload, loading:false};
        case AuthActionTypes.LOGOUT:
            return state =  initialState;
        default:
            return state;
    }
}
export const getAuthState = createFeatureSelector<AuthState>('auth');

export const loadUser = createSelector(getAuthState, (state: AuthState) => state.loading);
export const loadUserSuccess = createSelector(getAuthState, (state: AuthState) => state.user);
export const loadUserFailure = createSelector(getAuthState, (state: AuthState) => state.error);
export const logout = createSelector(getAuthState, (state: AuthState) => state = initialState);