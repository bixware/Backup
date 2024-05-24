import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEditCellRendererComponent } from './section-edit-cell-renderer.component';

describe('SectionEditCellRendererComponent', () => {
  let component: SectionEditCellRendererComponent;
  let fixture: ComponentFixture<SectionEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
