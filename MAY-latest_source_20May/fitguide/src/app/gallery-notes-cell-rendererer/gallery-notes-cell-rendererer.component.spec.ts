import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryNotesCellRenderererComponent } from './gallery-notes-cell-rendererer.component';

describe('GalleryNotesCellRenderererComponent', () => {
  let component: GalleryNotesCellRenderererComponent;
  let fixture: ComponentFixture<GalleryNotesCellRenderererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryNotesCellRenderererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryNotesCellRenderererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
