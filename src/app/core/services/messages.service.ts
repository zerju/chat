import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import * as io from 'socket.io-client';

import {environment} from '../../../environments/environment';
import {AddMessageAction, GetConversationByContactAction, GetConversationByIdAction} from '../actions/messages.action';
import {GetMessagesAction, RemoveLocalConversationAction} from '../actions/messages.action';
import {IContact} from '../models/contact.model';
import {IMessage} from '../models/message.model';
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
      this._socket =
          io(API_URL, {transports: ['websocket'], query: {token: this._token}});
    }
    this._socket.on('message', (message: IMessage) => {
      this._store.dispatch(new AddMessageAction(message));
    });
  }
  sendMessage(ids: string[], messagesNumber: number, message: ISendMessage) {
    const me =
        this._store.selectSnapshot<IContact>((state: any) => state.auth.user);
    const msg: IMessage = {
      content: message.message,
      sendDate: new Date(Date.now()),
      sender: me
    };
    this._store.dispatch(new AddMessageAction(msg));
    if (messagesNumber === 0) {
      this.onCreateConv(ids, message);
    } else {
      message.token = this._token;
      this._socket.emit('message', message);
    }
  }
  onMessage(): Observable<any> {
    return new Observable<any>(
        observer => {

        });
  }

  getMessages(contactIds: string[]) {
    this._store.dispatch(new GetMessagesAction(contactIds));
  }

  getConversationByContact(participantIds: string[]) {
    this._store.dispatch(new GetConversationByContactAction(participantIds));
  }
  getConversationById(conversationId: string) {
    this._store.dispatch(new GetConversationByIdAction(conversationId));
  }
  removeLocalConversation() {
    this._store.dispatch(new RemoveLocalConversationAction());
  }

  private onCreateConv(participantIds: string[], message: ISendMessage) {
    this.convSub =
        this.http
            .post(API_URL + '/conversation-by-contact', {participantIds: participantIds})
            .pipe(
                tap((res) => {
                  message.token = this._token;
                  console.log(res);
                  message.conversationId = (<any>res).conversation.id;
                  this._socket.emit('message', message);
                }),
                catchError((err) => throwError(err)))
            .subscribe((res) => {
              this.convSub.unsubscribe();
            });
  }
}
