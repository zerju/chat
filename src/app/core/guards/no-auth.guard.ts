import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Router,
  Route
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class NoAuthGuard implements CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}
  canLoad(route: Route): boolean | Observable<boolean>| Promise<boolean> {
    return this._authService.getAuth()
        .map((res) => {
          if (res) {
            this._router.navigate([environment.rootRoute]);
            return false;
          }
          return true;
        })
        .first();
  }
}
