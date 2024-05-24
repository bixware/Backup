import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkReturnsComponent } from './bulk-returns.component';

describe('BulkReturnsComponent', () => {
  let component: BulkReturnsComponent;
  let fixture: ComponentFixture<BulkReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
