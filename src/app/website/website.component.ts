import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Title} from '@angular/platform-browser';

import {environment} from '../../environments/environment';
import {IContact} from '../core/models/contact.model';
import {IGroup} from '../core/models/group.model';
import {IMessage} from '../core/models/message.model';
import {ContactType} from '../enums/contact-type.enum';

@Component({
  selector: 'zerju-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  alreadyAdded = [];
  participants: IContact[] = [
    {
      id: '1',
      username: 'Jure Žerak',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '2',
      username: 'Test Testing',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '3',
      username: 'Test Testing2',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '4',
      username: 'Test Testing3',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '5',
      username: 'Test Testing4',
      status: {online: true, banned: false},
      type: 0
    }
  ];
  contacts: IContact[] = [
    {
      id: '1',
      username: 'Jure Žerak',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '2',
      username: 'Test Testing',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '3',
      username: 'Test Testing2',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '4',
      username: 'Test Testing3',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '5',
      username: 'Test Testing4',
      status: {online: true, banned: false},
      type: 0
    },
    {
      id: '6',
      username: 'Anonymous',
      status: {online: true, banned: false},
      image: '../../../assets/profile/anon.jpg',
      type: 0
    },
    {
      id: '7',
      username: 'Group Chat',
      status: {online: true, banned: false},
      image: '../../../assets/profile/anon.jpg',
      type: 1,
      participants: this.participants
    }
  ];
  foundContacts: IContact[] = [];
  me = this.contacts[0];
  messages: IMessage[] = [
    {sentBy: this.contacts[1], value: 'Hello there'},
    {sentBy: this.contacts[0], value: 'yo!'},
    {sentBy: this.contacts[0], value: 'How is it going?'},
    {sentBy: this.contacts[1], value: 'Very good thank you, and you?'},
    {sentBy: this.contacts[1], value: 'How are you doing?'},
    {sentBy: this.contacts[0], value: 'I am fine'},
    {sentBy: this.contacts[1], value: 'Good to hear'}
  ];
  addedContacts: IContact[] = [];
  private _dialogRef$: MatDialogRef<any>;
  selectedContact: IContact;

  @ViewChild('createGroup') private _createGroup: TemplateRef<any>;
  @ViewChild('addToGroup') private _addToGroup: TemplateRef<any>;
  @ViewChild('addContact') private _addContact: TemplateRef<any>;
  constructor(private _dialog: MatDialog, private _title: Title) {}

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Chat');
    this.onContactSelect(this.contacts[0]);
  }

  /*
  here I need to call API for messages
  */
  onContactSelect(contact: IContact) {
    if (contact.type === ContactType.group) {
      // call API for GroupContact
    } else {
      // call API for normal contact
    }
    this.selectedContact = contact;
    if (contact.participants) {
      this.alreadyAdded = contact.participants;
    }
    this.messages[1].value = 'Yo ' + contact.username;
  }
  onNewMessage(message: string) {
    this.messages.push({sentBy: this.me, value: message});
  }
  openCreateGroup() {
    this._dialogRef$ = this._dialog.open(this._createGroup);
  }
  onGroupCreate(group: IGroup) {
    if (group) {
      this.contacts.push({
        id: (this.contacts.length + 1).toString(),
        username: group.name,
        email: 'tralala@email.com',
        status: {online: true, banned: false},
        image: '../../../assets/profile/group_chat.jpg',
        type: 1,
        participants: group.contacts
      });
      this.contacts = [...this.contacts];
    }
    this._dialogRef$.close();
  }
  onLeaveChatGroup() {
    console.log('Left chat group');
  }
  onAddToGroup() {
    this._dialogRef$ = this._dialog.open(this._addToGroup);
  }
  onAddContactToGroup(contacts: IContact[]) {
    if (contacts) {
      this.selectedContact.participants = contacts;
    }
    this._dialogRef$.close();
  }
  openAddContactDialog() {
    this._dialogRef$ = this._dialog.open(this._addContact);
  }
  onFindContact(contactName: string) {
    this.foundContacts = [...this.contacts.filter(
        (res) => this.addedContacts.indexOf(res) === -1)];
  }
  onAddContact(contact: IContact) {
    console.log('Contact added');
    this.addedContacts.push(contact);
  }
}
