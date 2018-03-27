import {IContact} from './contact.model';

export interface IGroup {
  id?: string;
  name: string;
  contacts: IContact[];
}
