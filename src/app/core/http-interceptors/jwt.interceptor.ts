import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';

import {LogoutAction, RefreshTokenAction} from '../actions/auth.action';
import {AppState} from '../app.state';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private _store: Store, private actions$: Actions) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({setHeaders: {Authorization: token}});
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._store.selectSnapshot<string>(
        (state: any) => state.auth.accessToken);
    // const tokenExp = this._store.selectSnapshot<number>(
    //     (state: any) => state.auth.token ? state.auth.token.exp : null);
    // const date = new Date();
    // const isExp = date.getTime() < tokenExp;
    if (token) {
      return next.handle(this.addToken(req, token))
          .pipe(catchError(err => {
            if (err instanceof HttpErrorResponse) {
              switch ((<HttpErrorResponse>err).status) {
                case 400:
                  return this.handle400Error(err);
                case 401:
                  return this.handle401Error(req, next);
              }
            } else {
              return throwError(err);
            }
          }));
    } else {
      return next.handle(req);
    }
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // hold all calls until we get the new token
      this.tokenSubject.next(null);
      return this._store.dispatch(new RefreshTokenAction())
          .pipe(switchMap((res) => {
            const token = this._store.selectSnapshot<string>(
                (state: any) => state.auth.accessToken);
            this.tokenSubject.next(token);
            this.isRefreshingToken = false;
            return next.handle(this.addToken(req, token));
          }));
    } else {
      return this.tokenSubject.pipe(
          filter(token => token != null), take(1), switchMap(token => {
            return next.handle(this.addToken(req, token));
          }));
    }
  }


  handle400Error(error) {
    if (error && error.status === 400 && error.error &&
        error.error.error === 'invalid_grant') {
      return this._store.dispatch(new LogoutAction());
    }
    return throwError(error);
  }
}
