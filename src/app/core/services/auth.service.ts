
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable, of} from 'rxjs';

import {LoginAction, LogoutAction} from '../actions/auth.action';
import {AppState} from '../app.state';
import {ILogin} from '../models/login.model';
import {AuthState} from '../states/auth.state';

@Injectable()
export class AuthService {
  private _state: AuthState;

  constructor(private _store: Store, private _router: Router) {}

  getState(): AuthState {
    return this._state;
  }


  login(userData: ILogin) {
    this._store.dispatch(new LoginAction(userData));
  }
  logout() {
    this._store.dispatch(new LogoutAction());
    this._router.navigate(['auth', 'login']);
  }
}
