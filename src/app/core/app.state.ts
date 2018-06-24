import {AuthState, AuthStateModel} from './states/auth.state';
import {ContactsState, ContactsStateModel} from './states/contacts.state';
import {MessagesStateModel} from './states/messages.state';
export interface AppState {
  authState: AuthStateModel;
  contactsState: ContactsStateModel;
  messagesState: MessagesStateModel;
}
