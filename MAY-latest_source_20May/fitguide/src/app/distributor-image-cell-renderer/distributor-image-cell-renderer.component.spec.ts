import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorImageCellRendererComponent } from './distributor-image-cell-renderer.component';

describe('DistributorImageCellRendererComponent', () => {
  let component: DistributorImageCellRendererComponent;
  let fixture: ComponentFixture<DistributorImageCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorImageCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorImageCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
