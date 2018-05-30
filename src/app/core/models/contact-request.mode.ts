export interface IContactRequest {
  date: Date;
  from: {image: string, username: string};
  responded: boolean;
}
