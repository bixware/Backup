import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcalloutComponent } from './viewcallout.component';

describe('ViewcalloutComponent', () => {
  let component: ViewcalloutComponent;
  let fixture: ComponentFixture<ViewcalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcalloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
