import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetUserDataAction} from '../actions/user.action';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private _store: Store) {}

  getUserData() {
    this._store.dispatch(new GetUserDataAction());
  }
}
