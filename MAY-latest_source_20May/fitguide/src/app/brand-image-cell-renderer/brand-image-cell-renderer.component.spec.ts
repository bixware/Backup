import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandImageCellRendererComponent } from './brand-image-cell-renderer.component';

describe('BrandImageCellRendererComponent', () => {
  let component: BrandImageCellRendererComponent;
  let fixture: ComponentFixture<BrandImageCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandImageCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandImageCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
