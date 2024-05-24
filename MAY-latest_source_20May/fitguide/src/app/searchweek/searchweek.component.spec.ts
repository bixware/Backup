import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchweekComponent } from './searchweek.component';

describe('SearchweekComponent', () => {
  let component: SearchweekComponent;
  let fixture: ComponentFixture<SearchweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchweekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
