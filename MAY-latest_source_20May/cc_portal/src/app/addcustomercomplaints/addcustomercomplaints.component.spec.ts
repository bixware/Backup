import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomercomplaintsComponent } from './addcustomercomplaints.component';

describe('AddcustomercomplaintsComponent', () => {
  let component: AddcustomercomplaintsComponent;
  let fixture: ComponentFixture<AddcustomercomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcustomercomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcustomercomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
