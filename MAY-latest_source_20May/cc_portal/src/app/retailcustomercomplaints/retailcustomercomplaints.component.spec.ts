import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailcustomercomplaintsComponent } from './retailcustomercomplaints.component';

describe('RetailcustomercomplaintsComponent', () => {
  let component: RetailcustomercomplaintsComponent;
  let fixture: ComponentFixture<RetailcustomercomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailcustomercomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailcustomercomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
