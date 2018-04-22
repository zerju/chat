import {Directive, ElementRef} from '@angular/core';

@Directive({selector: '[zerjuFocus]'})
export class FocusDirective {
  constructor(private _element: ElementRef) {
    this._element.nativeElement.focus();
  }
}
