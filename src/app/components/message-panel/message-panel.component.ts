import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {IContact} from '../../core/models/contact.model';
import {IMessage} from '../../core/models/message.model';
import {ContactType} from '../../enums/contact-type.enum';
import {MessagesService} from '../../core/services/messages.service';
import {OnDestroy} from '@angular/core';

const ASSETS = '../../../assets/';

@Component({
  selector: 'zerju-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit,
    OnDestroy {
  contactType = ContactType;
  private _messages: IMessage[];
  @Input()
  set messages(m: IMessage[]) {
    if (m) {
      this._messages = m;
      setTimeout(() => { this.scrollToBottom(); }, 100);
    }
  }
  get messages(): IMessage[] { return this._messages; }
  @Input() selected: IContact;
  @Input() me: IContact;

  @Output()
  newMessageEvent = new EventEmitter<
      {size: number, participants: string[], message: string}>();
  @Output() leaveChatGroup: EventEmitter<void> = new EventEmitter<void>();
  @Output() addToGroup: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('scrollBottom') private myScrollContainer: ElementRef;

  newMessage: string;
  constructor(private _messagesService: MessagesService) {}

  ngOnInit() { this.scrollToBottom(); }

  ngOnDestroy() {}

  scrollToBottom() {
    if (this.myScrollContainer) {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
            this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.log(err);
      }
    }
  }

  getImage(message: IMessage): string {
    if (!message && this.selected.image) {
      return this.selected.image;
    }
    if (message && message.sender.image) {
      return message.sender.image;
    }
    return ASSETS + 'profile/profile-pic.png';
  }

  sendMessage() {
    if (this.newMessage && this.newMessage.length > 0) {
      const participants = [];
      participants.push(this.selected.id);
      this.newMessageEvent.next({
        participants: participants,
        message: this.newMessage,
        size: this.messages.length
      });
      this.newMessage = '';
      this.textArea.nativeElement.value = '';
      this.textArea.nativeElement.focus();
    }
  }
  myMessage(message: IMessage) {
    if (message.sender.id === this.me.id) {
      return true;
    } else {
      return false;
    }
  }
  checkEvent(event: any) { console.log(event); }
  getParticipants() {
    // if (this.selected.type === ContactType.single) {
    return this.selected.username;
    // }
    // return this.selected.participants.map((res) => res.username).join(', ');
  }
}
