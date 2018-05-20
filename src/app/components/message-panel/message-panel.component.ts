import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {IContact} from '../../core/models/contact.model';
import {IMessage} from '../../core/models/message.model';
import {ContactType} from '../../enums/contact-type.enum';

@Component({
  selector: 'zerju-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {
  me: IContact = {
    id: '1',
    username: 'Jure Žerak',
    statuses: {online: true, banned: false},
    type: 0
  };
  contactType = ContactType;
  @Input() messages: IMessage[];
  @Input() selected: IContact;

  @Output() newMessageEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() leaveChatGroup: EventEmitter<void> = new EventEmitter<void>();
  @Output() addToGroup: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('textArea') textArea: ElementRef;

  newMessage: string;
  constructor() {}

  ngOnInit() {}

  getImage(message: IMessage): string {
    if (!message && this.selected.image) {
      return this.selected.image;
    }
    if (message && message.sentBy.image) {
      return message.sentBy.image;
    }
    return '../../../assets/profile/profile-pic.png';
  }

  sendMessage() {
    if (this.newMessage && this.newMessage.length > 0) {
      this.newMessageEvent.next(this.newMessage);
      this.newMessage = '';
      this.textArea.nativeElement.value = '';
      this.textArea.nativeElement.focus();
    }
  }
  myMessage(message: IMessage) {
    if (message.sentBy.id === this.me.id) {
      return true;
    } else {
      return false;
    }
  }
  checkEvent(event: any) {
    console.log(event);
  }
  getParticipants() {
    // if (this.selected.type === ContactType.single) {
    return this.selected.username;
    // }
    // return this.selected.participants.map((res) => res.username).join(', ');
  }
}
