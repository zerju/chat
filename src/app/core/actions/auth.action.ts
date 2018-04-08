import { registerActionType } from '../util/reducers.util';
import { Action } from '@ngrx/store';
import { IRegister } from '../models/register.model';
import { ILogin } from '../models/login.model';

export const AUTH_ACTIONS = {
  REGISTER_USER: registerActionType('[Auth Actions] Register User'),
  SUCCESS: registerActionType('[Auth Actions] Success'),
  FAIL: registerActionType('[Auth Actions] Fail'),
  LOGIN: registerActionType('[Auth Actions] Login')
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
