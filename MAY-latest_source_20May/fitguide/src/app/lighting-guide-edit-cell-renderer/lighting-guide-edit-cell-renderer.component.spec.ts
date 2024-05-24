import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingGuideEditCellRendererComponent } from './lighting-guide-edit-cell-renderer.component';

describe('LightingGuideEditCellRendererComponent', () => {
  let component: LightingGuideEditCellRendererComponent;
  let fixture: ComponentFixture<LightingGuideEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightingGuideEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightingGuideEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
