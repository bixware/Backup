import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiclenonpartComponent } from './addvehiclenonpart.component';

describe('AddvehiclenonpartComponent', () => {
  let component: AddvehiclenonpartComponent;
  let fixture: ComponentFixture<AddvehiclenonpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehiclenonpartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehiclenonpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
