import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiclemappingComponent } from './addvehiclemapping.component';

describe('AddvehiclemappingComponent', () => {
  let component: AddvehiclemappingComponent;
  let fixture: ComponentFixture<AddvehiclemappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehiclemappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehiclemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
