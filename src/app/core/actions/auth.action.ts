import {ILogin} from '../models/login.model';
import {IRegister} from '../models/register.model';
import {registerActionType} from '../util/reducers.util';

export class LoginAction {
  static readonly type = registerActionType('[Auth] Login');
  constructor(public login: ILogin) {}
}
export class RegisterAction {
  static readonly type = registerActionType('[Auth] Register');
  constructor(public register: IRegister) {}
}
export class LogoutAction {
  static readonly type = registerActionType('[Auth] Logout');
}
export class RefreshTokenAction {
  static readonly type = registerActionType('[Auth] Refresh Token');
}
