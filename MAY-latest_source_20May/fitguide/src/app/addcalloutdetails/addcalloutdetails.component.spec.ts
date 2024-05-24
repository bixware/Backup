import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcalloutdetailsComponent } from './addcalloutdetails.component';

describe('AddcalloutdetailsComponent', () => {
  let component: AddcalloutdetailsComponent;
  let fixture: ComponentFixture<AddcalloutdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcalloutdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcalloutdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
