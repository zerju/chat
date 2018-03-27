import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {IContact} from '../../core/models/contact.model';
import {FormControl, Validators} from '@angular/forms';
import {IGroup} from '../../core/models/group.model';

@Component({
  selector: 'zerju-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  filtered: IContact[];
  nameCtrl = new FormControl(null, [Validators.required]);
  addedContacts: IContact[];

  @Input() contacts: IContact[];

  @Output() onCreateEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
  createGroup() {
    console.log(this.nameCtrl);
    const group:
        IGroup = {name: this.nameCtrl.value, contacts: this.addedContacts};
  }
}
