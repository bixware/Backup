import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquevisitorsComponent } from './uniquevisitors.component';

describe('UniquevisitorsComponent', () => {
  let component: UniquevisitorsComponent;
  let fixture: ComponentFixture<UniquevisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquevisitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquevisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
