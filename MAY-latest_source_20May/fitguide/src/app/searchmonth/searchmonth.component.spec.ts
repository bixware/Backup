import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmonthComponent } from './searchmonth.component';

describe('SearchmonthComponent', () => {
  let component: SearchmonthComponent;
  let fixture: ComponentFixture<SearchmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchmonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
