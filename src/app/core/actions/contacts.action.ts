import {IContact} from '../models/contact.model';
import {IUser} from '../models/user.model';
import {registerActionType} from '../util/reducers.util';

export class FindContactsAction {
  static readonly type = registerActionType('[Contacts] Find');
  constructor(public search: string) {}
}
export class GetContactsAction {
  static readonly type = registerActionType('[Contacts] Get');
}
export class AddContactAction {
  static readonly type = registerActionType('[Contacts] Add');
  constructor(public contactid: string) {}
}
