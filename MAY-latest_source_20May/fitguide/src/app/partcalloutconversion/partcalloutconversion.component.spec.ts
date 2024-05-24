import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartcalloutconversionComponent } from './partcalloutconversion.component';

describe('PartcalloutconversionComponent', () => {
  let component: PartcalloutconversionComponent;
  let fixture: ComponentFixture<PartcalloutconversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartcalloutconversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartcalloutconversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
