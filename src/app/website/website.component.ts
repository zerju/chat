import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {IMessage} from '../core/models/message.model';
import {IContact} from '../core/models/contact.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {IGroup} from '../core/models/group.model';
import {ContactType} from '../enums/contact-type.enum';

@Component({
  selector: 'zerju-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  alreadyAdded = [];
  participants: IContact[] = [
    {id: '1', name: 'Jure Žerak', online: true, type: 0},
    {id: '2', name: 'Test Testing', online: true, type: 0},
    {id: '3', name: 'Test Testing2', online: true, type: 0},
    {id: '4', name: 'Test Testing3', online: true, type: 0},
    {id: '5', name: 'Test Testing4', online: true, type: 0}
  ];
  contacts: IContact[] = [
    {id: '1', name: 'Jure Žerak', online: true, type: 0},
    {id: '2', name: 'Test Testing', online: true, type: 0},
    {id: '3', name: 'Test Testing2', online: true, type: 0},
    {id: '4', name: 'Test Testing3', online: true, type: 0},
    {id: '5', name: 'Test Testing4', online: true, type: 0},
    {
      id: '6',
      name: 'Anonymous',
      online: false,
      image: '../../../assets/profile/anon.jpg',
      type: 0
    },
    {
      id: '7',
      name: 'Group Chat',
      online: true,
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
  private _dialogRef$: MatDialogRef<any>;
  selectedContact: IContact;

  @ViewChild('createGroup') private _createGroup: TemplateRef<any>;
  @ViewChild('addToGroup') private _addToGroup: TemplateRef<any>;
  @ViewChild('addContact') private _addContact: TemplateRef<any>;
  constructor(private _dialog: MatDialog) {}

  ngOnInit() { this.onContactSelect(this.contacts[0]); }

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
    this.messages[1].value = 'Yo ' + contact.name;
  }
  onNewMessage(message: string) {
    this.messages.push({sentBy: this.me, value: message});
  }
  openCreateGroup() { this._dialogRef$ = this._dialog.open(this._createGroup); }
  onGroupCreate(group: IGroup) {
    if (group) {
      this.contacts.push({
        id: (this.contacts.length + 1).toString(),
        name: group.name,
        online: true,
        image: '../../../assets/profile/group_chat.jpg',
        type: 1,
        participants: group.contacts
      });
      this.contacts = [...this.contacts];
    }
    this._dialogRef$.close();
  }
  onLeaveChatGroup() { console.log('Left chat group'); }
  onAddToGroup() { this._dialogRef$ = this._dialog.open(this._addToGroup); }
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
    this.foundContacts = [...this.contacts];
  }
  onAddContact(contact: IContact) { console.log('Contact added'); }
}
