import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutCellRenderComponent } from './callout-cell-render.component';

describe('CalloutCellRenderComponent', () => {
  let component: CalloutCellRenderComponent;
  let fixture: ComponentFixture<CalloutCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalloutCellRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
