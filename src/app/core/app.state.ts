import {AuthState, AuthStateModel} from './states/auth.state';
import {ContactsState, ContactsStateModel} from './states/contacts.state';
export interface AppState {
  authState: AuthStateModel;
  contactsState: ContactsStateModel;
}
