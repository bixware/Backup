import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreImageCellRendererComponent } from './store-image-cell-renderer.component';

describe('StoreImageCellRendererComponent', () => {
  let component: StoreImageCellRendererComponent;
  let fixture: ComponentFixture<StoreImageCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreImageCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreImageCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
