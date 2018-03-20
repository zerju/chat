import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IContact} from '../../core/models/contact.model';

@Component({
  selector: 'zerju-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit {
  @Input() contacts: IContact[];
  @Input() selected: string;

  @Output()
  onSelectEvent: EventEmitter<IContact> = new EventEmitter<IContact>();

  constructor() {}

  ngOnInit() {}
}
