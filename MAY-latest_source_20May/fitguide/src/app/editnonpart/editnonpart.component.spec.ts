import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnonpartComponent } from './editnonpart.component';

describe('EditnonpartComponent', () => {
  let component: EditnonpartComponent;
  let fixture: ComponentFixture<EditnonpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnonpartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnonpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
