import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Action, State, StateContext} from '@ngxs/store';
import * as jwtDecode from 'jwt-decode';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {LoginAction} from '../actions/auth.action';

export interface AuthStateModel {
  [key: string]: any;
  success?: boolean;
  error?: any;
  loggedIn?: boolean;
  user?: any;
  token: string;
}

@State
<AuthStateModel>(
    {name: 'auth',
     defaults: {loggedIn: false, token: ''}}) export class AuthState {
  constructor(private http: HttpClient, private _router: Router) {}

  @Action(LoginAction)
  loginUser(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    return this.http.post('http://localhost:3000/auth/login', action.login)
        .pipe(
            tap((res: any) => {
              const state = ctx.getState();
              ctx.setState({
                ...state,
                loggedIn: true,
                user: res.user,
                token: jwtDecode(res.token)
              });
              this._router.navigate([environment.rootRoute]);
            }),
            catchError((err) => {
              return throwError(err);
            }));
  }
}
