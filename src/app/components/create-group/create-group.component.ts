import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {IContact} from '../../core/models/contact.model';
import {FormControl, Validators} from '@angular/forms';
import {IGroup} from '../../core/models/group.model';
import {ContactType} from '../../enums/contact-type.enum';

@Component({
  selector: 'zerju-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  filtered: IContact[];
  nameCtrl = new FormControl(null, [Validators.required]);
  addedContacts: IContact[];
  private _contacts: IContact[];

  @Input()
  set contacts(c: IContact[]) {
    this._contacts = c.filter((res) => res.type === ContactType.single);
  }
  get contacts(): IContact[] { return this._contacts; }

  @Output() onCreateEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
  createGroup() {
    const group:
        IGroup = {name: this.nameCtrl.value, contacts: this.addedContacts};
    this.onCreateEvent.next(group);
  }
}
