import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnJustifiedComponent } from './un-justified.component';

describe('UnJustifiedComponent', () => {
  let component: UnJustifiedComponent;
  let fixture: ComponentFixture<UnJustifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnJustifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnJustifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
