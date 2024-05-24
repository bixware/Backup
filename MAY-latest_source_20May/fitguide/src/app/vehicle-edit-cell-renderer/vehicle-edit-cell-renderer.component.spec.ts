import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEditCellRendererComponent } from './vehicle-edit-cell-renderer.component';

describe('VehicleEditCellRendererComponent', () => {
  let component: VehicleEditCellRendererComponent;
  let fixture: ComponentFixture<VehicleEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
