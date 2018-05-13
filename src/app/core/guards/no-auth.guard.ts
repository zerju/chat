import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {AuthService} from '../services/auth.service';

@Injectable()
export class NoAuthGuard implements CanLoad {
  constructor(private store: Store, private _router: Router) {}
  canLoad(route: Route): boolean|Observable<boolean>|Promise<boolean> {
    return this.store.select((state) => state.auth)
        .pipe(
            map((authState) => {
              if (authState.loggedIn) {
                this._router.navigate([environment.rootRoute]);
                return false;
              }
              return true;
            }),
            first());
  }
}
