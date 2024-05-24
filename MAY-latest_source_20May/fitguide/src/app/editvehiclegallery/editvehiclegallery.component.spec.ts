import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvehiclegalleryComponent } from './editvehiclegallery.component';

describe('EditvehiclegalleryComponent', () => {
  let component: EditvehiclegalleryComponent;
  let fixture: ComponentFixture<EditvehiclegalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditvehiclegalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvehiclegalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
