import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';

import {AuthState, AuthStateModel} from '../../core/states/auth.state';

@Component({
  selector: 'zerju-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountImage = '../../../assets/profile/profile-pic.png';

  @Select(AuthState) auth$: Observable<AuthStateModel>;

  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
