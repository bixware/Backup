import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImageCellRendererComponent } from './gallery-image-cell-renderer.component';

describe('GalleryImageCellRendererComponent', () => {
  let component: GalleryImageCellRendererComponent;
  let fixture: ComponentFixture<GalleryImageCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryImageCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryImageCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
