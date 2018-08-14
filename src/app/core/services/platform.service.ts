import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetPlatformAction} from '../actions/platform.action';

@Injectable({providedIn: 'root'})
export class PlatformService {
  constructor(private _store: Store) {}

  getPlatform() { this._store.dispatch(new GetPlatformAction()); }
}
