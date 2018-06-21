import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {ISendMessage} from '../models/send-message.model';
import {Store} from '@ngxs/store';

@Injectable({providedIn: 'root'})
export class MessagesService {
  private _socket: any;
  constructor(private _store: Store) {}
  connectSocket() {
    const token = this._store.selectSnapshot<string>(
        (state: any) => state.auth.accessToken);
    if (this._socket === undefined) {
      this._socket = io('http://localhost:3000', {
        transports: ['websocket', 'polling', 'flashsocket'],
        query: {token: token}
      });
    }
  }
  sendMessage(message: ISendMessage) { this._socket.emit('message', message); }
}
