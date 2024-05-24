import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebundlepartComponent } from './managebundlepart.component';

describe('ManagebundlepartComponent', () => {
  let component: ManagebundlepartComponent;
  let fixture: ComponentFixture<ManagebundlepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebundlepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagebundlepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
