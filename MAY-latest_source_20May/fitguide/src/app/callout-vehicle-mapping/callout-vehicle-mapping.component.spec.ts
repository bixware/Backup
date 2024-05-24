import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutVehicleMappingComponent } from './callout-vehicle-mapping.component';

describe('CalloutVehicleMappingComponent', () => {
  let component: CalloutVehicleMappingComponent;
  let fixture: ComponentFixture<CalloutVehicleMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalloutVehicleMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutVehicleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
