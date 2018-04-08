import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'zerju-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private _title: Title) { }

  ngOnInit() {
    this._title.setTitle(environment.titlePrefix + 'Login');
    this.form = new FormGroup({
      'username': new FormControl(undefined, [Validators.required]),
      'password': new FormControl(undefined, [Validators.required])
    });
  }
}
