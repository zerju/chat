import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IContactRequest} from '../../core/models/contact-request.mode';

@Component({
  selector: 'zerju-contact-request',
  templateUrl: './contact-request.component.html',
  styleUrls: ['./contact-request.component.scss']
})
export class ContactRequestComponent implements OnInit {
  @Input() request: IContactRequest;

  @Output()
  respondRequest: EventEmitter<{id: string, response: boolean}> =
      new EventEmitter<{id: string, response: boolean}>();

  constructor() {}

  ngOnInit() {}
}
