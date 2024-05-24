import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclenonpartComponent } from './vehiclenonpart.component';

describe('VehiclenonpartComponent', () => {
  let component: VehiclenonpartComponent;
  let fixture: ComponentFixture<VehiclenonpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclenonpartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclenonpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
