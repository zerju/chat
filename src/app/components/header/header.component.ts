import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
  navbarOpen = true;

  @Select(AuthState) auth$: Observable<AuthStateModel>;

  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  respondRequest: EventEmitter<{id: string, response: boolean}> =
      new EventEmitter<{id: string, response: boolean}>();
  @Output() toggleNavbarEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    this.toggleNavbarEvent.next(this.navbarOpen);
  }
}
