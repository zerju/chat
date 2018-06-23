import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import * as io from 'socket.io-client';

import {environment} from '../../../environments/environment';
import {ISendMessage} from '../models/send-message.model';

const API_URL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class MessagesService {
  private _socket: any;
  private _token: string;
  private convSub: Subscription;
  constructor(private _store: Store, private http: HttpClient) {}
  connectSocket() {
    this._token = this._store.selectSnapshot<string>(
        (state: any) => state.auth.accessToken);
    if (this._socket === undefined) {
      console.log('socket init');
      this._socket =
          io(API_URL, {transports: ['websocket'], query: {token: this._token}});
    }
    this._socket.on('message', (data: any) => console.log(data));
  }
  sendMessage(ids: string[], messagesNumber: number, message: ISendMessage) {
    if (messagesNumber === 0) {
      this.onCreateConv(ids, message);
    } else {
      message.token = this._token;
      this._socket.emit('message', message);
    }
  }
  onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('message', (data: any) => console.log(data));
    });
  }
  private onCreateConv(participantIds: string[], message: ISendMessage) {
    this.convSub =
        this.http
            .post(API_URL + '/conversation', {participantIds: participantIds})
            .pipe(
                tap((res) => {
                  console.log(res, 'conv');
                  message.token = this._token;
                  message.conversationId = (<any>res).conversation[0].id;
                  this._socket.emit('message', message);
                }),
                catchError((err) => throwError(err)))
            .subscribe((res) => {
              this.convSub.unsubscribe();
            });
  }
}
