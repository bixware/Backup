import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleedituserComponent } from './roleedituser.component';

describe('RoleedituserComponent', () => {
  let component: RoleedituserComponent;
  let fixture: ComponentFixture<RoleedituserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleedituserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleedituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
