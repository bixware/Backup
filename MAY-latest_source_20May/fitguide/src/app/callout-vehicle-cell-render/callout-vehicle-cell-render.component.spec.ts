import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutVehicleCellRenderComponent } from './callout-vehicle-cell-render.component';

describe('CalloutVehicleCellRenderComponent', () => {
  let component: CalloutVehicleCellRenderComponent;
  let fixture: ComponentFixture<CalloutVehicleCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalloutVehicleCellRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutVehicleCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
