import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAnnouncementComponent } from './store-announcement.component';

describe('StoreAnnouncementComponent', () => {
  let component: StoreAnnouncementComponent;
  let fixture: ComponentFixture<StoreAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
