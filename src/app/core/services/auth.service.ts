
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable, of} from 'rxjs';

import {LoginAction, LogoutAction, RefreshTokenAction, RegisterAction} from '../actions/auth.action';
import {AppState} from '../app.state';
import {ILogin} from '../models/login.model';
import {IRegister} from '../models/register.model';
import {AuthState} from '../states/auth.state';

@Injectable()
export class AuthService {
  constructor(private _store: Store, private _router: Router) {}

  login(userData: ILogin) {
    this._store.dispatch(new LoginAction(userData));
  }
  logout() {
    this._store.dispatch(new LogoutAction());
    this._router.navigate(['auth', 'login']);
  }
  register(userData: IRegister) {
    this._store.dispatch(new RegisterAction(userData));
  }
  refreshToken() {
    this._store.dispatch(new RefreshTokenAction());
  }
}
