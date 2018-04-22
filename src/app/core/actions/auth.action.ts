import {Action} from '@ngrx/store';

import {ILogin} from '../models/login.model';
import {IRegister} from '../models/register.model';
import {registerActionType} from '../util/reducers.util';

export const AUTH_ACTIONS = {
  REGISTER_USER: registerActionType('[Auth Actions] Register User'),
  SUCCESS: registerActionType('[Auth Actions] Success'),
  FAIL: registerActionType('[Auth Actions] Fail'),
  LOGIN: registerActionType('[Auth Actions] Login'),
  LOGOUT: registerActionType('[Auth Actions] Logout')
};

export class RegisterUserAction implements Action {
  type = AUTH_ACTIONS.REGISTER_USER;
  constructor(public payload: IRegister) {}
}
export class AuthSuccessAction implements Action {
  type = AUTH_ACTIONS.SUCCESS;
  constructor(public payload: ILogin) {}
}
export class AuthFailAction implements Action {
  type = AUTH_ACTIONS.FAIL;
  constructor(public payload: any) {}
}
export class LoginAction implements Action {
  type = AUTH_ACTIONS.LOGIN;
  constructor(payload: ILogin) {}
}
export class LogoutAction implements Action {
  type = AUTH_ACTIONS.LOGOUT;
  constructor() {}
}
