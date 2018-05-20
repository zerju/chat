import {IStatus} from './status.model';
export interface IUser {
  id: string;
  username: string;
  email?: string;
  status: IStatus;
  image?: string;
  type?: number;
}
