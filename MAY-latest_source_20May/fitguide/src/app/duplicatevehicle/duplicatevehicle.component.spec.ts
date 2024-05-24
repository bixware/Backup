import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatevehicleComponent } from './duplicatevehicle.component';

describe('DuplicatevehicleComponent', () => {
  let component: DuplicatevehicleComponent;
  let fixture: ComponentFixture<DuplicatevehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatevehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatevehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
