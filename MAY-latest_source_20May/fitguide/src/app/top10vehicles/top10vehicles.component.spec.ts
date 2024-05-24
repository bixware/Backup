import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10vehiclesComponent } from './top10vehicles.component';

describe('Top10vehiclesComponent', () => {
  let component: Top10vehiclesComponent;
  let fixture: ComponentFixture<Top10vehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top10vehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10vehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
