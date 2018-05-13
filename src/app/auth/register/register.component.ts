import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

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

  constructor(private _title: Title) { }

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Register');
    this.form = new FormGroup({
      'username': new FormControl(undefined, Validators.required),
      'email': new FormControl(undefined, [Validators.required, Validators.email]),
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

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
