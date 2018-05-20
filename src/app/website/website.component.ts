import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {IContact} from '../core/models/contact.model';
import {IGroup} from '../core/models/group.model';
import {IMessage} from '../core/models/message.model';
import {ContactsService} from '../core/services/contacts.service';
import {UserService} from '../core/services/user.service';
import {ContactsState, ContactsStateModel} from '../core/states/contacts.state';
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
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '2',
      username: 'Test Testing',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '3',
      username: 'Test Testing2',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '4',
      username: 'Test Testing3',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '5',
      username: 'Test Testing4',
      statuses: {online: true, banned: false},
      type: 0
    }
  ];
  contacts: IContact[] = [
    {
      id: '1',
      username: 'Jure Žerak',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '2',
      username: 'Test Testing',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '3',
      username: 'Test Testing2',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '4',
      username: 'Test Testing3',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '5',
      username: 'Test Testing4',
      statuses: {online: true, banned: false},
      type: 0
    },
    {
      id: '6',
      username: 'Anonymous',
      statuses: {online: true, banned: false},
      image: '../../../assets/profile/anon.jpg',
      type: 0
    },
    {
      id: '7',
      username: 'Group Chat',
      statuses: {online: true, banned: false},
      image: '../../../assets/profile/anon.jpg',
      type: 1,
      participants: this.participants
    }
  ];
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

  @Select(ContactsState) foundContacts$: Observable<ContactsStateModel>;

  @ViewChild('createGroup') private _createGroup: TemplateRef<any>;
  @ViewChild('addToGroup') private _addToGroup: TemplateRef<any>;
  @ViewChild('addContact') private _addContact: TemplateRef<any>;
  constructor(
      private _dialog: MatDialog, private _title: Title,
      private _contactsService: ContactsService,
      private _userService: UserService) {}

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Chat');
    //   this.onContactSelect(this.contacts[0]);
    this._userService.getUserData();
    this._contactsService.getContacts();
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
        statuses: {online: true, banned: false},
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
    console.log('find', contactName);
    this._contactsService.findContacts(contactName);
  }
  onAddContact(contact: IContact) {
    console.log('Contact added');
    this._contactsService.addContact(contact.id);
    // this.addedContacts.push(contact);
  }
}
