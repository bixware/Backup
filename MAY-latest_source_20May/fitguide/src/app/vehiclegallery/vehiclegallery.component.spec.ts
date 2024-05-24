import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclegalleryComponent } from './vehiclegallery.component';

describe('VehiclegalleryComponent', () => {
  let component: VehiclegalleryComponent;
  let fixture: ComponentFixture<VehiclegalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclegalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclegalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
