import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmasterComponent } from './brandmaster.component';

describe('BrandmasterComponent', () => {
  let component: BrandmasterComponent;
  let fixture: ComponentFixture<BrandmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
