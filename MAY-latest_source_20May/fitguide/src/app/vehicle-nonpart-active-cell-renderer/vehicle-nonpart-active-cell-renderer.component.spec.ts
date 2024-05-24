import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNonpartActiveCellRendererComponent } from './vehicle-nonpart-active-cell-renderer.component';

describe('VehicleNonpartActiveCellRendererComponent', () => {
  let component: VehicleNonpartActiveCellRendererComponent;
  let fixture: ComponentFixture<VehicleNonpartActiveCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNonpartActiveCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleNonpartActiveCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
