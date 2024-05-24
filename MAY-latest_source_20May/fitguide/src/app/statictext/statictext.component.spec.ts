import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatictextComponent } from './statictext.component';

describe('StatictextComponent', () => {
  let component: StatictextComponent;
  let fixture: ComponentFixture<StatictextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatictextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatictextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
