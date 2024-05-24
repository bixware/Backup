import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutBtnCellRendererComponent } from './callout-btn-cell-renderer.component';

describe('CalloutBtnCellRendererComponent', () => {
  let component: CalloutBtnCellRendererComponent;
  let fixture: ComponentFixture<CalloutBtnCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalloutBtnCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutBtnCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
