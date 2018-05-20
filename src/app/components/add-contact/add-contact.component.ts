import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IContact} from '../../core/models/contact.model';

@Component({
  selector: 'zerju-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  input = '';
  searched = false;
  isClickedOnce: false;

  @Input() foundContacts: any;

  @Output() findContactEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  addContactEvent: EventEmitter<IContact> = new EventEmitter<IContact>();
  constructor() {}

  ngOnInit() {}

  findContacts() {
    if (this.input.length > 0) {
      this.findContactEvent.next(this.input);
      this.searched = true;
    }
  }
  addContact(contact: IContact) {
    // const index = this.foundContacts.indexOf(contact);
    // this.foundContacts.splice(index, 1);
    this.addContactEvent.next(contact);
  }
}
