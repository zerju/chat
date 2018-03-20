import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import {IMessage} from '../../core/models/message.model';
import {IContact} from '../../core/models/contact.model';

@Component({
  selector: 'zerju-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {
  @Input() messages: IMessage[];
  @Input() selected: IContact;

  @Output() newMessageEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('textArea') textArea: ElementRef;

  newMessage: string;
  constructor() {}

  ngOnInit() {}

  getImage(): string {
    if (this.selected.image) {
      return this.selected.image;
    } else {
      return '../../../assets/profile/profile-pic.png';
    }
  }

  sendMessage() {
    if (this.newMessage && this.newMessage.length > 0) {
      this.newMessageEvent.next(this.newMessage);
      this.newMessage = '';
      this.textArea.nativeElement.value = '';
      this.textArea.nativeElement.focus();
    }
  }
  checkEvent(event: any) { console.log(event); }
}
