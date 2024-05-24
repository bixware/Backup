import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalusersComponent } from './globalusers.component';

describe('GlobalusersComponent', () => {
  let component: GlobalusersComponent;
  let fixture: ComponentFixture<GlobalusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
