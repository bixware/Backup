import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchlogComponent } from './searchlog.component';

describe('SearchlogComponent', () => {
  let component: SearchlogComponent;
  let fixture: ComponentFixture<SearchlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
