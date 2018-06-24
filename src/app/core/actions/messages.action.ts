import {IMessage} from '../models/message.model';
import {registerActionType} from '../util/reducers.util';

export class GetMessagesAction {
  static readonly type = registerActionType('[Messages] Get');
  constructor(public participantIds: string[]) {}
}
export class AddMessageAction {
  static readonly type = registerActionType('[Messages] Add');
  constructor(public message: IMessage) {}
}
export class GetConversationByContactAction {
  static readonly type =
      registerActionType('[Messages] Conversation By Contact');
  constructor(public participantIds: string[]) {}
}
export class GetConversationByIdAction {
  static readonly type = registerActionType('[Messages] Conversation By ID');
  constructor(public conversationId: string) {}
}
export class RemoveLocalConversationAction {
  static readonly type =
      registerActionType('[Messages] Remove Local Conversation');
  constructor() {}
}
