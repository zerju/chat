import { AuthState } from '../states/auth.state';
import { AuthFailAction, AuthSuccessAction, AUTH_ACTIONS } from '../actions/auth.action';

export function authReducer(state: AuthState, action: AuthFailAction|AuthSuccessAction): AuthState {
  switch (action.type) {
    case AUTH_ACTIONS.SUCCESS:
      return Object.assign({}, state, {loggedIn: true, user: action.payload});
    case AUTH_ACTIONS.FAIL:
      return Object.assign({}, state, {error: 'Login error'});
    default:
      return state;
  }
}
