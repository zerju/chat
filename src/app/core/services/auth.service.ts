import {Injectable} from '@angular/core';
import {AuthState} from '../states/auth.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AppState} from '../app.state';
import {AUTH_SEL} from '../selectors/auth.selector';
import {ILogin} from '../models/login.model';
import {LoginAction, AuthSuccessAction} from '../actions/auth.action';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  private _state: AuthState;

  constructor(private _store: Store<AppState>) {
    this.stateChange().subscribe((res) => { this._state = res; });
  }

  getState(): AuthState { return this._state; }

  stateChange(): Observable<AuthState> { return this._store.select(AUTH_SEL); }

  login(userData: ILogin) {
    this._store.dispatch(new AuthSuccessAction(userData));
  }
  getAuth(): Observable<boolean> {
    if (this._state) {
      return Observable.of(this._state.loggedIn);
    }
    return Observable.of(false);
  }
}
