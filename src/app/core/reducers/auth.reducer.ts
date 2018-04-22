import {AUTH_ACTIONS, AuthFailAction, AuthSuccessAction, LogoutAction} from '../actions/auth.action';
import {AuthState} from '../states/auth.state';

export function authReducer(
    state: AuthState, action: AuthFailAction|AuthSuccessAction): AuthState {
  switch (action.type) {
    case AUTH_ACTIONS.SUCCESS:
      return Object.assign({}, state, {loggedIn: true, user: action.payload});
    case AUTH_ACTIONS.FAIL:
      return Object.assign({}, state, {error: 'Login error'});
    case AUTH_ACTIONS.LOGOUT:
      delete state['user'];
      return Object.assign({}, state, {loggedIn: false});
    default:
      return state;
  }
}
