import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiclegalleryComponent } from './addvehiclegallery.component';

describe('AddvehiclegalleryComponent', () => {
  let component: AddvehiclegalleryComponent;
  let fixture: ComponentFixture<AddvehiclegalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehiclegalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehiclegalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
