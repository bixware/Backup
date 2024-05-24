import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcanalysisComponent } from './qcanalysis.component';

describe('QcanalysisComponent', () => {
  let component: QcanalysisComponent;
  let fixture: ComponentFixture<QcanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
