import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QccustomercomplaintsComponent } from './qccustomercomplaints.component';

describe('QccustomercomplaintsComponent', () => {
  let component: QccustomercomplaintsComponent;
  let fixture: ComponentFixture<QccustomercomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QccustomercomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QccustomercomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
