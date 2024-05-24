import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertermeditComponent } from './usertermedit.component';

describe('UsertermeditComponent', () => {
  let component: UsertermeditComponent;
  let fixture: ComponentFixture<UsertermeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertermeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertermeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
