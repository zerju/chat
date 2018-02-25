import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'zerju-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: string;
  constructor() {}

  ngOnInit() {
    this.year = (new Date()).getFullYear().toString();
  }
}
