import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'zerju-autocomplete-add',
  templateUrl: './autocomplete-add.component.html',
  styleUrls: ['./autocomplete-add.component.scss']
})
export class AutocompleteAddComponent implements OnInit {
  filtered: any[];
  addedElements: any[] = [];
  numOfInput: number;
  active = false;

  @Input() allElements: any[];

  @Output() onElementAdd: EventEmitter<any[]> = new EventEmitter<any[]>();

  @ViewChild('input') input: ElementRef;

  constructor() {}

  ngOnInit() {}
  addElement(el: any) {
    this.input.nativeElement.focus();
    this.input.nativeElement.value = '';
    this.addedElements.push(el);
    this.active = false;
    this.onElementAdd.next(this.addedElements);
  }
  onFilter(input: string) {
    if (input.length > 0 && input.trim().length > 0) {
      this.active = true;
      this.numOfInput = input.length;
      this.filtered = this.allElements.filter((res) => {
        return res.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      });
    } else {
      this.filtered = [];
    }
  }
  removeAdded(input: string) {
    if (input.length === 0) {
      this.addedElements.splice(-1, 1);
      this.onElementAdd.next(this.addedElements);
    }
  }
  removeAddedByIndex(index: number) {
    this.addedElements.splice(index, 1);
    this.onElementAdd.next(this.addedElements);
  }
}
