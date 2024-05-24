import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcuscomplaintsComponent } from './addcuscomplaints.component';

describe('AddcuscomplaintsComponent', () => {
  let component: AddcuscomplaintsComponent;
  let fixture: ComponentFixture<AddcuscomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcuscomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcuscomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
