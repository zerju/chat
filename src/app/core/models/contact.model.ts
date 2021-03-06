import {IStatus} from './status.model';
export interface IContact {
  id: string;
  username: string;
  email?: string;
  statuses: IStatus;
  image?: string;
  type?: number;
  participants?: IContact[];
}
