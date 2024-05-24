import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpartEditCellRendererComponent } from './viewpart-edit-cell-renderer.component';

describe('ViewpartEditCellRendererComponent', () => {
  let component: ViewpartEditCellRendererComponent;
  let fixture: ComponentFixture<ViewpartEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpartEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpartEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
