import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolemenueditComponent } from './userrolemenuedit.component';

describe('UserrolemenueditComponent', () => {
  let component: UserrolemenueditComponent;
  let fixture: ComponentFixture<UserrolemenueditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrolemenueditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolemenueditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
