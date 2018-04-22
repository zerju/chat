import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({selector: '[zerjuClickOutside]'})
export class ClickOutsideDirective {
  @Output()
  public zerjuClickOutside: EventEmitter<MouseEvent> =
      new EventEmitter<MouseEvent>();

  constructor(private _element: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
    const clickedInside = this._element.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.zerjuClickOutside.emit(event);
    }
  }
}
