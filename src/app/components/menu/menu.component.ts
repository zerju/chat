import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {isEqual} from 'lodash';

@Component({
  selector: 'zerju-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  show = false;
  @Input() menuHandlerElement: HTMLElement;
  @Input() position = 'bottom';

  @ViewChild('divEl') private _divEl: ElementRef;

  constructor(private _element: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {}

  closeOpen(event: any) {
    if (!isEqual(event.target, this.menuHandlerElement) && !this.show) {
      return;
    }
    if (!isEqual(event.target, this.menuHandlerElement)) {
      this.show = false;
    } else if (isEqual(event.target, this.menuHandlerElement) && this.show) {
      this.show = false;
    } else {
      for (let i = 0; i < 2; i++) {
        this.show = true;
        setTimeout(() => {
          this.setMenuPosition();
        }, 1);
        if (i === 0) {
          this.show = false;
        }
      }
    }
  }

  setMenuPosition() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    let offsetTop = 0;
    let offsetLeft = 0;
    const triggerEl = this.menuHandlerElement;
    const menuEl = this._element.nativeElement;
    const divEl = this._divEl.nativeElement;
    switch (this.position) {
      case 'top': {
        offsetLeft = triggerEl.offsetWidth;
        break;
      }
      case 'bottom': {
        offsetTop = triggerEl.offsetHeight;
        offsetLeft = triggerEl.offsetWidth / 2;
        break;
      }
      case 'left': {
        offsetLeft = -triggerEl.offsetWidth / 2;
        break;
      }
      case 'right': {
        offsetLeft = triggerEl.offsetLeft / 2;
        break;
      }
      default: { offsetTop = triggerEl.offsetHeight; }
    }
    let left = triggerEl.offsetLeft + offsetLeft - divEl.offsetWidth +
        triggerEl.offsetWidth / 2;
    const top = triggerEl.offsetTop + offsetTop;
    if ((left + triggerEl.offsetWidth) > innerWidth) {
      left = left + (innerWidth - left);
    }
    if (left < 0) {
      left = 0;
    }
    this._renderer.setStyle(menuEl, 'position', 'absolute');
    this._renderer.setStyle(menuEl, 'top', `${top}px`);
    this._renderer.setStyle(menuEl, 'left', `${left}px`);
  }
}
