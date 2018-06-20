import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Action, State, StateContext} from '@ngxs/store';
import * as jwtDecode from 'jwt-decode';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {
  LoginAction,
  LogoutAction,
  RefreshTokenAction,
  RegisterAction
} from '../actions/auth.action';
import {GetUserDataAction} from '../actions/user.action';
import {IToken} from '../models/token.model';

const baseURL = environment.apiURL + '/auth/';

export interface AuthStateModel {
  [key: string]: any;
  success?: boolean;
  error?: any;
  loggedIn?: boolean;
  user?: any;
  token?: IToken;
  refreshToken?: string;
  refreshTokenExp?: Date;
  accessToken?: string;
}

@State
<AuthStateModel>(
    {name: 'auth', defaults: {loggedIn: false}}) export class AuthState {
  constructor(private http: HttpClient, private _router: Router) {}

  @Action(LoginAction)
  loginUser(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    return this.http.post(baseURL + 'login', action.login)
        .pipe(tap((res: any) => {
                const state = ctx.getState();
                ctx.setState({
                  ...state,
                  loggedIn: true,
                  user: res.user,
                  token: jwtDecode(res.token),
                  accessToken: res.token,
                  refreshToken: res.refreshToken,
                  refreshTokenExp: res.refreshTokenExp
                });
                this._router.navigate([environment.rootRoute]);
              }),
              catchError((err) => throwError(err)));
  }

  @Action(RegisterAction)
  registerUser(ctx: StateContext<AuthStateModel>, action: RegisterAction) {
    return this.http.post(baseURL + 'register', action.register)
        .pipe(tap(() => { this._router.navigate([environment.loginRoute]); }),
              catchError((err) => throwError(err)));
  }
  @Action(RefreshTokenAction)
  refreshToken(ctx: StateContext<AuthStateModel>, action: RefreshTokenAction) {
    const state = ctx.getState();
    return this.http.post(baseURL + 'refreshtoken',
                          {refreshToken: state.refreshToken})
        .pipe(tap((res) => {
                ctx.setState({...state, accessToken: (<any>res).newToken});
              }),
              catchError((err) => {
                this._router.navigate([environment.loginRoute]);
                return throwError(err);
              }));
  }

  @Action(LogoutAction)
  logoutUser(ctx: StateContext<AuthStateModel>, action: LogoutAction) {
    const state = ctx.getState();
    ctx.setState({});
    this._router.navigate(['/login']);
  }

  @Action(GetUserDataAction)
  getUserData(ctx: StateContext<AuthStateModel>, action: GetUserDataAction) {
    const state = ctx.getState();
    return this.http.get(environment.apiURL + '/user')
        .pipe(
            tap((res) => { ctx.setState({...state, user: (<any>res).user}); }),
            catchError((err) => throwError(err)));
  }
}
