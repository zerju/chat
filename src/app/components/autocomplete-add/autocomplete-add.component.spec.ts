import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteAddComponent } from './autocomplete-add.component';

describe('AutocompleteAddComponent', () => {
  let component: AutocompleteAddComponent;
  let fixture: ComponentFixture<AutocompleteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
