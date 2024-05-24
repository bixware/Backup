import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleGalleryEditCellRendererComponent } from './vehicle-gallery-edit-cell-renderer.component';

describe('VehicleGalleryEditCellRendererComponent', () => {
  let component: VehicleGalleryEditCellRendererComponent;
  let fixture: ComponentFixture<VehicleGalleryEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleGalleryEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleGalleryEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
