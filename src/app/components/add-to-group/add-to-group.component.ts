import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IContact} from '../../core/models/contact.model';
import {ContactType} from '../../enums/contact-type.enum';

@Component({
  selector: 'zerju-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.scss']
})
export class AddToGroupComponent implements OnInit {
  newContacts: IContact[];
  private _contacts: IContact[];

  @Input() addedElements: IContact;
  @Input()
  set contacts(c: IContact[]) {
    this._contacts = c.filter((res) => res.type === ContactType.single);
  }
  get contacts(): IContact[] { return this._contacts; }

  @Output() onElementAdd: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() {}

  ngOnInit() {}
}
