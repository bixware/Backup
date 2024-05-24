import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedcustomercomplaintsComponent } from './closedcustomercomplaints.component';

describe('ClosedcustomercomplaintsComponent', () => {
  let component: ClosedcustomercomplaintsComponent;
  let fixture: ComponentFixture<ClosedcustomercomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedcustomercomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedcustomercomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
