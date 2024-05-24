import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEditCellRendererComponent } from './brand-edit-cell-renderer.component';

describe('BrandEditCellRendererComponent', () => {
  let component: BrandEditCellRendererComponent;
  let fixture: ComponentFixture<BrandEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
