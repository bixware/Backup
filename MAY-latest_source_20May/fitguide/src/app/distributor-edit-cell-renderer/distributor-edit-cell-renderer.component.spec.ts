import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorEditCellRendererComponent } from './distributor-edit-cell-renderer.component';

describe('DistributorEditCellRendererComponent', () => {
  let component: DistributorEditCellRendererComponent;
  let fixture: ComponentFixture<DistributorEditCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorEditCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorEditCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
