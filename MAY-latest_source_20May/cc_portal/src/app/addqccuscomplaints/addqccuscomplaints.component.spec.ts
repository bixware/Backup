import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddqccuscomplaintsComponent } from './addqccuscomplaints.component';

describe('AddqccuscomplaintsComponent', () => {
  let component: AddqccuscomplaintsComponent;
  let fixture: ComponentFixture<AddqccuscomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddqccuscomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddqccuscomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
