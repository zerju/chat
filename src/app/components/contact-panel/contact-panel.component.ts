import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IContact} from '../../core/models/contact.model';
import {ContactVisibility} from '../../enums/contact-visibility.enum';
import {ContactType} from '../../enums/contact-type.enum';

@Component({
  selector: 'zerju-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit {
  private _contacts: IContact[];
  visibility: number;
  shownContacts: IContact[];
  @Input()
  set contacts(c: IContact[]) {
    if (c) {
      this._contacts = c;
      this.showContacts(0);
    }
  }
  @Input() selected: string;

  @Output()
  onSelectEvent: EventEmitter<IContact> = new EventEmitter<IContact>();
  @Output() onCreateGroupEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  showContacts(contactVisibility: number) {
    this.visibility = contactVisibility;
    switch (contactVisibility) {
      case ContactVisibility.ONLINE:
        this.shownContacts =
            this._contacts.filter((res) => res.online === true);
        break;
      case ContactVisibility.OFFLINE:
        this.shownContacts =
            this._contacts.filter((res) => res.online === false);
        break;
      case ContactVisibility.GROUP:
        this.shownContacts =
            this._contacts.filter((res) => res.type === ContactType.group);
        break;
      case ContactVisibility.ALL:
        this.shownContacts = this._contacts;
        break;
      default:
        this.shownContacts = this._contacts;
    }
  }
}
