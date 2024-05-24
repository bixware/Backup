import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecustomercomplaintsComponent } from './singlecustomercomplaints.component';

describe('SinglecustomercomplaintsComponent', () => {
  let component: SinglecustomercomplaintsComponent;
  let fixture: ComponentFixture<SinglecustomercomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglecustomercomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecustomercomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
