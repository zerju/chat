import { Injectable } from '@angular/core';
import { AuthState } from '../states/auth.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.state';
import { AUTH_SEL } from '../selectors/auth.selector';
import { ILogin } from '../models/login.model';
import { LoginAction, AuthSuccessAction } from '../actions/auth.action';

@Injectable()
export class AuthService {
  private _state: AuthState;

  constructor(private _store: Store<AppState>) {}

  getState(): AuthState {
    return this._state;
  }

  stateChange(): Observable<AuthState> {
    return this._store.select(AUTH_SEL);
  }

  login(userData: ILogin) {
    this._store.dispatch(new AuthSuccessAction(userData));
  }

}
