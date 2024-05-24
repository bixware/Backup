import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedistributorComponent } from './managedistributor.component';

describe('ManagedistributorComponent', () => {
  let component: ManagedistributorComponent;
  let fixture: ComponentFixture<ManagedistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
