import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'zerju-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountImage = '../../../assets/profile/profile-pic.png';
  showMenu = false;
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
