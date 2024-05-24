import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnCellRenderComponent } from './ign-cell-render.component';

describe('IgnCellRenderComponent', () => {
  let component: IgnCellRenderComponent;
  let fixture: ComponentFixture<IgnCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgnCellRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
