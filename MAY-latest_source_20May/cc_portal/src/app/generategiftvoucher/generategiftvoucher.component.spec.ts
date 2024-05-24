import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerategiftvoucherComponent } from './generategiftvoucher.component';

describe('GenerategiftvoucherComponent', () => {
  let component: GenerategiftvoucherComponent;
  let fixture: ComponentFixture<GenerategiftvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerategiftvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerategiftvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
