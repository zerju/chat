import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

import {environment} from '../../../environments/environment';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'zerju-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  passwordInput: string;
  passwordsMatch = false;
  repeatTouched = false;
  formSub: Subscription;

  constructor(private _title: Title, private _authService: AuthService) {}

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Register');
    this.form = new FormGroup({
      'username': new FormControl(undefined, Validators.required),
      'email':
          new FormControl(undefined, [Validators.required, Validators.email]),
      'password': new FormControl(undefined, [Validators.required]),
      'repeatPassword': new FormControl(undefined, [Validators.required])
    });
    this.formSub = this.form.valueChanges.subscribe((res) => {
      if (this.form.controls['repeatPassword'].dirty) {
        this.repeatTouched = true;
        if (res.password === res.repeatPassword) {
          this.passwordsMatch = true;
        } else {
          this.passwordsMatch = false;
        }
      }
    });
  }
  register() {
    const user = this.form.value;
    delete user.repeatPassword;
    this._authService.register(user);
  }

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
