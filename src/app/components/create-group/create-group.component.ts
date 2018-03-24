import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zerju-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  @Output()
  onCreateEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
