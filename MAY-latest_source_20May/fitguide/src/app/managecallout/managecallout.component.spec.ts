import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecalloutComponent } from './managecallout.component';

describe('ManagecalloutComponent', () => {
  let component: ManagecalloutComponent;
  let fixture: ComponentFixture<ManagecalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecalloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
