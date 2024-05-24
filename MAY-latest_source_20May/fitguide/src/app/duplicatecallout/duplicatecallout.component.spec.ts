import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatecalloutComponent } from './duplicatecallout.component';

describe('DuplicatecalloutComponent', () => {
  let component: DuplicatecalloutComponent;
  let fixture: ComponentFixture<DuplicatecalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatecalloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatecalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
