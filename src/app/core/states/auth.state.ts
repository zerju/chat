export interface AuthState {
  [key: string]: any;
  success?: boolean;
  error: any;
  loggedIn?: boolean;
  user?: any;
}
