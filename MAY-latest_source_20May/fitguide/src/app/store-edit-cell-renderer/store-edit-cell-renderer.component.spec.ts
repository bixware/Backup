import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditCellRendererComponent } from './store-edit-cell-renderer.component';

describe('StoreEditCellRendererComponent', () => {
  let component: StoreEditCellRendererComponent;
  let fixture: ComponentFixture<StoreEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
