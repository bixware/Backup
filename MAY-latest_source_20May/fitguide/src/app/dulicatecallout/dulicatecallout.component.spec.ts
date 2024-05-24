import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulicatecalloutComponent } from './dulicatecallout.component';

describe('DulicatecalloutComponent', () => {
  let component: DulicatecalloutComponent;
  let fixture: ComponentFixture<DulicatecalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DulicatecalloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DulicatecalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
