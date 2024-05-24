import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodetagrequploadComponent } from './barcodetagrequpload.component';

describe('BarcodetagrequploadComponent', () => {
  let component: BarcodetagrequploadComponent;
  let fixture: ComponentFixture<BarcodetagrequploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodetagrequploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodetagrequploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
