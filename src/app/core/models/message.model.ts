import {IContact} from './contact.model';
export interface IMessage {
  id?: string;
  sender: IContact;
  content: string;
}
