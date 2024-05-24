import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAnnouncementComponent } from './global-announcement.component';

describe('GlobalAnnouncementComponent', () => {
  let component: GlobalAnnouncementComponent;
  let fixture: ComponentFixture<GlobalAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
