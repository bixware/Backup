import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchyearComponent } from './searchyear.component';

describe('SearchyearComponent', () => {
  let component: SearchyearComponent;
  let fixture: ComponentFixture<SearchyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
