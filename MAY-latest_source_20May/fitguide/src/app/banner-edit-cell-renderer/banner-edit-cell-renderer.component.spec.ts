import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEditCellRendererComponent } from './banner-edit-cell-renderer.component';

describe('BannerEditCellRendererComponent', () => {
  let component: BannerEditCellRendererComponent;
  let fixture: ComponentFixture<BannerEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
