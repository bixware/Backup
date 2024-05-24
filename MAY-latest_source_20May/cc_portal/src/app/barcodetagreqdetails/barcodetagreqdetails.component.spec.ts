import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodetagreqdetailsComponent } from './barcodetagreqdetails.component';

describe('BarcodetagreqdetailsComponent', () => {
  let component: BarcodetagreqdetailsComponent;
  let fixture: ComponentFixture<BarcodetagreqdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodetagreqdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodetagreqdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
