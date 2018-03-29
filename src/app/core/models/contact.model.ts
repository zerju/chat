export interface IContact {
  id: string;
  name: string;
  online: boolean;
  image?: string;
  type?: number;
  participants?: IContact[];
}
