import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialCellRendererComponent } from './trial-cell-renderer.component';

describe('TrialCellRendererComponent', () => {
  let component: TrialCellRendererComponent;
  let fixture: ComponentFixture<TrialCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
