import {IStatus} from './satus.model';
export interface IContact {
  id: string;
  username: string;
  email?: string;
  status: IStatus;
  image?: string;
  type?: number;
  participants?: IContact[];
}
