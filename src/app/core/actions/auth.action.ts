import {ILogin} from '../models/login.model';
import {registerActionType} from '../util/reducers.util';

export class LoginAction {
  static readonly type = registerActionType('[Auth] Login');
  constructor(public login: ILogin) {}
}
export class RegisterAction {
  static readonly type = registerActionType('[Auth] Register');
}
export class LogoutAction {
  static readonly type = registerActionType('[Auth] Logout');
}
