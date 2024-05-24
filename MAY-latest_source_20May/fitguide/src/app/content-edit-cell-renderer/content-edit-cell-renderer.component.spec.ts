import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditCellRendererComponent } from './content-edit-cell-renderer.component';

describe('ContentEditCellRendererComponent', () => {
  let component: ContentEditCellRendererComponent;
  let fixture: ComponentFixture<ContentEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
