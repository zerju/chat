import {Component, OnInit} from '@angular/core';
import {IMessage} from '../core/models/message.model';

@Component({
  selector: 'zerju-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  messages: IMessage[] = [
    {send: false, value: 'Hello there'},
    {send: true, value: 'yo!'},
    {send: true, value: 'How is it going?'},
    {send: false, value: 'Very good thank you, and you?'},
    {send: false, value: 'How are you doing?'},
    {send: true, value: 'I am fine'},
    {send: false, value: 'Good to hear'}
  ];
  constructor() {}

  ngOnInit() {}
}
