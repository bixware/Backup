import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinterlockguideComponent } from './addinterlockguide.component';

describe('AddinterlockguideComponent', () => {
  let component: AddinterlockguideComponent;
  let fixture: ComponentFixture<AddinterlockguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinterlockguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinterlockguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
