import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleadditionalComponent } from './vehicleadditional.component';

describe('VehicleadditionalComponent', () => {
  let component: VehicleadditionalComponent;
  let fixture: ComponentFixture<VehicleadditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleadditionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleadditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
