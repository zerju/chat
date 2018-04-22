import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {isEqual} from 'lodash';

@Component({
  selector: 'zerju-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  show = false;
  offsetPosition = 0;
  innerHeight: number;
  innerWidth: number;
  @Input() menuHandlerElement: ElementRef;
  // @Input() this comes later
  position = 'bottom';

  @ViewChild('divEl') private _divEl: ElementRef;

  constructor(private _element: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {}

  closeOpen(event: any) {
    if (!isEqual(event.target, this.menuHandlerElement.nativeElement) &&
        !this.show) {
      return;
    }
    if (!isEqual(event.target, this.menuHandlerElement.nativeElement)) {
      this.show = false;
    } else if (
        isEqual(event.target, this.menuHandlerElement.nativeElement) &&
        this.show) {
      this.show = false;
    } else {
      this.show = true;
      setTimeout(() => this.setMenuPosition(), 0);
    }
  }

  setMenuPosition() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    const triggerEl = this.menuHandlerElement.nativeElement;
    const menuEl = this._element.nativeElement;
    const divEl = this._divEl.nativeElement;
    switch (this.position) {
      case 'top': {
        break;
      }
      case 'bottom': {
        this.offsetPosition = triggerEl.offsetHeight;
        break;
      }
      case 'left': {
        this.offsetPosition = triggerEl.x;
        break;
      }
      case 'right': {
        this.offsetPosition = triggerEl.x;
        break;
      }
      default: { this.offsetPosition = triggerEl.offsetHeight; }
    }
    let left = triggerEl.x + this.offsetPosition - divEl.offsetWidth;
    const top = triggerEl.y + this.offsetPosition;
    if (left > this.innerWidth) {
      left = left + (this.innerWidth - left);
    }
    if (left < 0) {
      left = 0;
    }
    this._renderer.setStyle(menuEl, 'position', 'absolute');
    this._renderer.setStyle(menuEl, 'top', `${top}px`);
    this._renderer.setStyle(menuEl, 'left', `${left}px`);
  }
}
