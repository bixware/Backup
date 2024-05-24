import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtdownloadComponent } from './ptdownload.component';

describe('PtdownloadComponent', () => {
  let component: PtdownloadComponent;
  let fixture: ComponentFixture<PtdownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtdownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
