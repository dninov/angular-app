import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER} from './auth.actions';
import { User } from './user.model';
export interface State{
    isAuthenticated: boolean;
    user: any;
}

const initialState: State  = {
    isAuthenticated: false,
    user: {},
}

export function authReducer(state = initialState, action: AuthActions){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{isAuthenticated: true,};
        case SET_UNAUTHENTICATED:
            return {isAuthenticated: false};
        case SET_USER:
            return { ...state, user: action.payload };
        default: {
            return state; 
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;