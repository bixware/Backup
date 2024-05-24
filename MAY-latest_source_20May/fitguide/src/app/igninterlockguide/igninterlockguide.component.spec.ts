import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgninterlockguideComponent } from './igninterlockguide.component';

describe('IgninterlockguideComponent', () => {
  let component: IgninterlockguideComponent;
  let fixture: ComponentFixture<IgninterlockguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgninterlockguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgninterlockguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
