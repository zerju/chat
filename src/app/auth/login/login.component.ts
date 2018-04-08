import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'zerju-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private _title: Title, private _authService: AuthService) { }

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
  }
}
