import {Component, OnInit, Input} from '@angular/core';
import {IMessage} from '../../core/models/message.model';

@Component({
  selector: 'zerju-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {
  @Input() messages: IMessage[];
  constructor() {}

  ngOnInit() {}
}
