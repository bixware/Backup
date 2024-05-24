import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyImageCellRendererComponent } from './company-image-cell-renderer.component';

describe('CompanyImageCellRendererComponent', () => {
  let component: CompanyImageCellRendererComponent;
  let fixture: ComponentFixture<CompanyImageCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyImageCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyImageCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
