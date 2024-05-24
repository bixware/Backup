import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpviewComponent } from './lpview.component';

describe('LpviewComponent', () => {
  let component: LpviewComponent;
  let fixture: ComponentFixture<LpviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
