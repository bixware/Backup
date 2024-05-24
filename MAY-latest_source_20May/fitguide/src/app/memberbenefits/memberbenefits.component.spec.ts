import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberbenefitsComponent } from './memberbenefits.component';

describe('MemberbenefitsComponent', () => {
  let component: MemberbenefitsComponent;
  let fixture: ComponentFixture<MemberbenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberbenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberbenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
