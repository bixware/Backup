import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddistributorComponent } from './adddistributor.component';

describe('AdddistributorComponent', () => {
  let component: AdddistributorComponent;
  let fixture: ComponentFixture<AdddistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
