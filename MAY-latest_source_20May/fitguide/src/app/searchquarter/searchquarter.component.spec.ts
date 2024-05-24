import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchquarterComponent } from './searchquarter.component';

describe('SearchquarterComponent', () => {
  let component: SearchquarterComponent;
  let fixture: ComponentFixture<SearchquarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchquarterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
