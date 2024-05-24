import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolebrandeditComponent } from './userrolebrandedit.component';

describe('UserrolebrandeditComponent', () => {
  let component: UserrolebrandeditComponent;
  let fixture: ComponentFixture<UserrolebrandeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrolebrandeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolebrandeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
