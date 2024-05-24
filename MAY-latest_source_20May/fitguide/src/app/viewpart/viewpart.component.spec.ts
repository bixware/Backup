import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpartComponent } from './viewpart.component';

describe('ViewpartComponent', () => {
  let component: ViewpartComponent;
  let fixture: ComponentFixture<ViewpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
