import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbulkeditComponent } from './userbulkedit.component';

describe('UserbulkeditComponent', () => {
  let component: UserbulkeditComponent;
  let fixture: ComponentFixture<UserbulkeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbulkeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbulkeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
