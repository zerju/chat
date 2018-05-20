import {HttpClient} from '@angular/common/http';
import {Action, State, StateContext} from '@ngxs/store';
import {throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {AddContactAction, FindContactsAction, GetContactsAction} from '../actions/contacts.action';
import {IContact} from '../models/contact.model';

const apiURL = environment.apiURL + '/users';

export interface ContactsStateModel {
  foundContacts?: IContact[];
  friends: IContact[];
}

@State
<ContactsStateModel>(
    {name: 'contactsState',
     defaults: {friends: []}}) export class ContactsState {
  constructor(private http: HttpClient) {}

  @Action(FindContactsAction)
  findContacts(
      ctx: StateContext<ContactsStateModel>, action: FindContactsAction) {
    return this.http.get(apiURL + '?search=' + action.search)
        .pipe(
            debounceTime(500), distinctUntilChanged(),
            tap((foundContacts: any) => {
              const state = ctx.getState();
              ctx.setState(
                  {...state, foundContacts: <IContact[]>foundContacts});
            }),
            catchError((err) => {
              return throwError(err);
            }));
  }

  @Action(AddContactAction)
  addContact(ctx: StateContext<ContactsStateModel>, action: AddContactAction) {
    return this.http.post(
        apiURL + '/sendrequest', {contactid: action.contactid});
  }
  @Action(GetContactsAction)
  getContacts(
      ctx: StateContext<ContactsStateModel>, action: GetContactsAction) {
    const state = ctx.getState();
    return this.http.get(apiURL + '/contacts')
        .pipe(
            tap((res: any) => {
              ctx.setState({...state, friends: res.friends});
            }),
            catchError((err) => throwError(err)));
  }
}
