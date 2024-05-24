import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehicledetailsComponent } from './addvehicledetails.component';

describe('AddvehicledetailsComponent', () => {
  let component: AddvehicledetailsComponent;
  let fixture: ComponentFixture<AddvehicledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehicledetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehicledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
