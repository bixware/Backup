import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacklogComponent } from './feedbacklog.component';

describe('FeedbacklogComponent', () => {
  let component: FeedbacklogComponent;
  let fixture: ComponentFixture<FeedbacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacklogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
