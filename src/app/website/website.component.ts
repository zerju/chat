import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {IMessage} from '../core/models/message.model';
import {IContact} from '../core/models/contact.model';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'zerju-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  messages: IMessage[] = [
    {send: false, value: 'Hello there'},
    {send: true, value: 'yo!'},
    {send: true, value: 'How is it going?'},
    {send: false, value: 'Very good thank you, and you?'},
    {send: false, value: 'How are you doing?'},
    {send: true, value: 'I am fine'},
    {send: false, value: 'Good to hear'}
  ];
  contacts: IContact[] = [
    {id: '1', name: 'Jure Žerak', online: true},
    {id: '2', name: 'Test Testing', online: true},
    {id: '2', name: 'Test Testing2', online: true},
    {id: '2', name: 'Test Testing3', online: true},
    {id: '2', name: 'Test Testing4', online: true},
    {
      id: '3',
      name: 'Anonymous',
      online: false,
      image: '../../../assets/profile/anon.jpg'
    }
  ];
  private _dialogRef$: MatDialogRef<any>;
  selectedContact: IContact;

  @ViewChild('createGroup') private _createGroup: TemplateRef<any>;
  constructor(private _dialog: MatDialog) {}

  ngOnInit() { this.onContactSelect(this.contacts[0]); }

  /*
  here I need to call API for messages
  */
  onContactSelect(contact: IContact) {
    this.selectedContact = contact;
    this.messages[1].value = 'Yo ' + contact.name;
  }
  onNewMessage(message: string) {
    this.messages.push({send: true, value: message});
  }
  openCreateGroup() { this._dialogRef$ = this._dialog.open(this._createGroup); }
  onGroupCreate(event: any) { this._dialogRef$.close(); }
}
