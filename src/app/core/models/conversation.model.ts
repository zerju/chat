import {IContact} from './contact.model';

export interface IConversation {
  id: string;
  participants: IContact[];
}
