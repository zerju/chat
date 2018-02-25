import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zerju-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
accountImage = '../../../assets/profile/profile-pic.png';
  constructor() { }

  ngOnInit() {
  }

}
