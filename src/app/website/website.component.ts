import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {skip, takeUntil} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {IContact} from '../core/models/contact.model';
import {IConversation} from '../core/models/conversation.model';
import {IGroup} from '../core/models/group.model';
import {IMessage} from '../core/models/message.model';
import {ISendMessage} from '../core/models/send-message.model';
import {ContactsService} from '../core/services/contacts.service';
import {MessagesService} from '../core/services/messages.service';
import {UserService} from '../core/services/user.service';
import {ContactsState, ContactsStateModel} from '../core/states/contacts.state';
import {MessagesState, MessagesStateModel} from '../core/states/messages.state';
import {ContactType} from '../enums/contact-type.enum';

@Component({
  selector: 'zerju-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit, OnDestroy {
  alreadyAdded = [];
  me: IContact;
  addedContacts: IContact[] = [];
  selectedContact: IContact;
  conversationId: string;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _dialogRef$: MatDialogRef<any>;

  @Select(MessagesState) messages$: Observable<MessagesStateModel>;
  @Select(ContactsState) foundContacts$: Observable<ContactsStateModel>;

  @ViewChild('createGroup') private _createGroup: TemplateRef<any>;
  @ViewChild('addToGroup') private _addToGroup: TemplateRef<any>;
  @ViewChild('addContact') private _addContact: TemplateRef<any>;
  constructor(
      private _dialog: MatDialog, private _title: Title,
      private _contactsService: ContactsService,
      private _userService: UserService,
      private _messagesService: MessagesService, private _router: Router,
      private _route: ActivatedRoute, private _store: Store) {}

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Chat');
    //   this.onContactSelect(this.contacts[0]);
    this._userService.getUserData();
    this._contactsService.getContacts();
    this._messagesService.connectSocket();
    this.me =
        this._store.selectSnapshot<IContact>((state: any) => state.auth.user);
    this.messages$.pipe(takeUntil(this.destroyed$), skip(1))
        .subscribe((res) => {
          if (res.conversation && res.conversation.id !== this.conversationId) {
            this._router.navigate(['chat', 'c', res.conversation.id]);
          }
        });
    this._route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      if (params.conversationId) {
        this.conversationId = params.conversationId;
        const contacts = this._store.selectSnapshot<IContact[]>(
            (state: any) => state.contactsState.friends);
        const conversation = this._store.selectSnapshot<IConversation>(
            (state: any) => state.messagesState.conversation);
        // if (conversation === undefined) {
        //   this._messagesService.getConversationById(params.conversationId);
        //   return;
        // }
        const contactId =
            conversation.participants.find((x) => x.id !== this.me.id).id;
        this.selectedContact = contacts.find((x) => x.id === contactId);
        this._messagesService.getMessages([contactId]);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    // this._messagesService.removeLocalConversation();
  }

  /*
  here I need to call API for messages
  */
  onContactSelect(contact: IContact) {
    this._messagesService.getConversationByContact([contact.id]);
  }
  onNewMessage(event: {participants: string[], message: string, size: number}) {
    const sendMessage: ISendMessage = {
      conversationId: this.conversationId,
      message: event.message,
      token: ''
    };
    this._messagesService.sendMessage(
        event.participants, event.size, sendMessage);
  }
  openCreateGroup() {
    this._dialogRef$ = this._dialog.open(this._createGroup);
  }
  onGroupCreate(group: IGroup) {
    if (group) {
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
    this._contactsService.findContacts(contactName);
  }
  onAddContact(contact: IContact) {
    this._contactsService.addContact(contact.id);
    // this.addedContacts.push(contact);
  }
  respondAction(event: {id: string, response: boolean}) {
    this._contactsService.respondContact(event);
  }
}
