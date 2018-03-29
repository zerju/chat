import {IContact} from './contact.model';
export interface IMessage {
  id?: string;
  sentBy: IContact;
  value: string;
}
