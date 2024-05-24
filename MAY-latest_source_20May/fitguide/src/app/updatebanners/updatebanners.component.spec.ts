import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebannersComponent } from './updatebanners.component';

describe('UpdatebannersComponent', () => {
  let component: UpdatebannersComponent;
  let fixture: ComponentFixture<UpdatebannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
