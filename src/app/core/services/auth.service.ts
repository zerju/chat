import 'rxjs/add/observable/of';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AuthSuccessAction, LoginAction, LogoutAction} from '../actions/auth.action';
import {AppState} from '../app.state';
import {ILogin} from '../models/login.model';
import {AUTH_SEL} from '../selectors/auth.selector';
import {AuthState} from '../states/auth.state';

@Injectable()
export class AuthService {
  private _state: AuthState;

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.stateChange().subscribe((res) => {
      this._state = res;
    });
  }

  getState(): AuthState {
    return this._state;
  }

  stateChange(): Observable<AuthState> {
    return this._store.select(AUTH_SEL);
  }

  login(userData: ILogin) {
    this._store.dispatch(new AuthSuccessAction(userData));
  }
  logout() {
    this._store.dispatch(new LogoutAction());
    this._router.navigate(['auth', 'login']);
  }

  getAuth(): Observable<boolean> {
    if (this._state) {
      return Observable.of(this._state.loggedIn);
    }
    return Observable.of(false);
  }
}
