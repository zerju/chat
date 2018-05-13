import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'zerju-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
      private _title: Title, private _authService: AuthService,
      private _router: Router) {}

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Login');
    this.form = new FormGroup({
      'username': new FormControl(undefined, [Validators.required]),
      'password': new FormControl(undefined, [Validators.required])
    });
  }
  login() {
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    this._authService.login({username: username, password: password});
    //   this._router.navigate([environment.rootRoute]);
  }
}
