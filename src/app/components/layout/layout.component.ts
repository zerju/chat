import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {
  PlatformStateModel,
  PlatformState
} from '../../core/states/platform.state';

@Component({
  selector: 'zerju-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(PlatformState) platform$: Observable<PlatformStateModel>;

  @Output()
  respondRequest: EventEmitter<{id: string, response: boolean}> =
      new EventEmitter<{id: string, response: boolean}>();
  @Output() toggleNavbarEvent = new EventEmitter<boolean>();
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  onLogout() { this._authService.logout(); }
}
