import {HttpClient} from '@angular/common/http';
import {Action, State, StateContext, Store} from '@ngxs/store';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {AddMessageAction, GetConversationByContactAction, GetConversationByIdAction} from '../actions/messages.action';
import {GetMessagesAction, RemoveLocalConversationAction} from '../actions/messages.action';
import {IConversation} from '../models/conversation.model';
import {IMessage} from '../models/message.model';


const apiURL = environment.apiURL;

export interface MessagesStateModel {
  messages?: IMessage[];
  conversation?: IConversation;
}

@State
<MessagesStateModel>(
    {name: 'messagesState',
     defaults: {messages: []}}) export class MessagesState {
  constructor(private http: HttpClient, private _store: Store) {}

  @Action(GetMessagesAction)
  findContacts(
      ctx: StateContext<MessagesStateModel>, action: GetMessagesAction) {
    return this.http
        .post(apiURL + '/getMessages', {participantIds: action.participantIds})
        .pipe(
            tap((res: any) => {
              const state = ctx.getState();
              ctx.setState({...state, messages: (<IMessage[]>res.messages)});
            }),
            catchError((err) => throwError(err)));
  }
  @Action(GetConversationByContactAction)
  getConversationByContact(
      ctx: StateContext<MessagesStateModel>,
      action: GetConversationByContactAction) {
    return this.http
        .post(
            apiURL + '/conversation-by-contact',
            {participantIds: action.participantIds})
        .pipe(
            tap((res: any) => {
              const state = ctx.getState();
              ctx.setState({...state, conversation: res.conversation});
            }),
            catchError((err) => throwError(err)));
  }
  @Action(GetConversationByIdAction)
  getConversationById(
      ctx: StateContext<MessagesStateModel>,
      action: GetConversationByIdAction) {
    return this.http
        .post(
            apiURL + '/conversation-by-id',
            {conversationId: action.conversationId})
        .pipe(
            tap((res: any) => {
              const state = ctx.getState();
              ctx.setState({...state, conversation: res.conversation});
            }),
            catchError((err) => throwError(err)));
  }

  @Action(RemoveLocalConversationAction)
  removeLocalConversation(
      ctx: StateContext<MessagesStateModel>,
      action: RemoveLocalConversationAction) {
    const state = ctx.getState();
    ctx.setState({...state, conversation: undefined});
  }

  @Action(AddMessageAction)
  addMessageToState(
      ctx: StateContext<MessagesStateModel>, action: AddMessageAction) {
    const state = ctx.getState();
    const messages = state.messages;
    messages.push(action.message);
    ctx.setState({...state, messages: messages});
  }
}
