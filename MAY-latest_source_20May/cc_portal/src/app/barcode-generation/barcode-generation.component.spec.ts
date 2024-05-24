import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeGenerationComponent } from './barcode-generation.component';

describe('BarcodeGenerationComponent', () => {
  let component: BarcodeGenerationComponent;
  let fixture: ComponentFixture<BarcodeGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
