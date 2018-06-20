import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {ISendMessage} from '../models/send-message.model';

@Injectable({providedIn: 'root'})
export class MessagesService {
  private _socket: any;
  constructor() {}
  connectSocket() {
    if (this._socket === undefined) {
      this._socket = io('http://localhost:3000',
                        {transports: ['websocket', 'polling', 'flashsocket']});
    }
  }
  sendMessage(message: ISendMessage) { this._socket.emit('message', message); }
}
