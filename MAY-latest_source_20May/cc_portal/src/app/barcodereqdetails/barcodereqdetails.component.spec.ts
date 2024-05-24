import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodereqdetailsComponent } from './barcodereqdetails.component';

describe('BarcodereqdetailsComponent', () => {
  let component: BarcodereqdetailsComponent;
  let fixture: ComponentFixture<BarcodereqdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodereqdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodereqdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
