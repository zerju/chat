import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'zerju-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output()
  respondRequest: EventEmitter<{id: string, response: boolean}> =
      new EventEmitter<{id: string, response: boolean}>();
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  onLogout() { this._authService.logout(); }
}
