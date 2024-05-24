import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdistributorComponent } from './editdistributor.component';

describe('EditdistributorComponent', () => {
  let component: EditdistributorComponent;
  let fixture: ComponentFixture<EditdistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
