import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacklogCompleteIncompleteCellRendererComponent } from './feedbacklog-complete-incomplete-cell-renderer.component';

describe('FeedbacklogCompleteIncompleteCellRendererComponent', () => {
  let component: FeedbacklogCompleteIncompleteCellRendererComponent;
  let fixture: ComponentFixture<FeedbacklogCompleteIncompleteCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacklogCompleteIncompleteCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacklogCompleteIncompleteCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
