import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcinwardsComponent } from './qcinwards.component';

describe('QcinwardsComponent', () => {
  let component: QcinwardsComponent;
  let fixture: ComponentFixture<QcinwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcinwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcinwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
