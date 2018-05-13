import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {AuthService} from '../services/auth.service';
import {AuthStateModel} from '../states/auth.state';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private store: Store, private _router: Router) {}
  canLoad(route: Route): boolean|Observable<boolean>|Promise<boolean> {
    return this.store.select((state) => state.auth)
        .pipe(
            map((authState) => {
              if (!authState.loggedIn) {
                this._router.navigate([environment.loginRoute]);
                return false;
              }
              return true;
            }),
            first());
  }
}
