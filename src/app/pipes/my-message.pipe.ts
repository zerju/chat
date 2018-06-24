import {Pipe, PipeTransform} from '@angular/core';

import {IContact} from '../core/models/contact.model';
import {IMessage} from '../core/models/message.model';

@Pipe({name: 'myMessage'})
export class MyMessagePipe implements PipeTransform {
  transform(message: IMessage, me: IContact): any {
    if (message.sender.id === me.id) {
      return true;
    } else {
      return false;
    }
  }
}
