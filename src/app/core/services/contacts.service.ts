import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';

import {AddContactAction, FindContactsAction, GetContactsAction} from '../actions/contacts.action';
import {IContact} from '../models/contact.model';
import {IUser} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class ContactsService {
  constructor(private _store: Store) {}

  getContacts() {
    this._store.dispatch(new GetContactsAction());
  }
  findContacts(search: string) {
    this._store.dispatch(new FindContactsAction(search));
  }
  addContact(contact: string) {
    this._store.dispatch(new AddContactAction(contact));
  }
}
