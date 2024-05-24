import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebannersComponent } from './managebanners.component';

describe('ManagebannersComponent', () => {
  let component: ManagebannersComponent;
  let fixture: ComponentFixture<ManagebannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagebannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
