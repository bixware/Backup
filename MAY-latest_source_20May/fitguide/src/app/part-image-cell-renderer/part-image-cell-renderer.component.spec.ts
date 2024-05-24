import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartImageCellRendererComponent } from './part-image-cell-renderer.component';

describe('PartImageCellRendererComponent', () => {
  let component: PartImageCellRendererComponent;
  let fixture: ComponentFixture<PartImageCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartImageCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartImageCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
