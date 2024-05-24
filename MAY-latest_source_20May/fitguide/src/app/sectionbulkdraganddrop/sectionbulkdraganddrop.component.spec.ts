import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionbulkdraganddropComponent } from './sectionbulkdraganddrop.component';

describe('SectionbulkdraganddropComponent', () => {
  let component: SectionbulkdraganddropComponent;
  let fixture: ComponentFixture<SectionbulkdraganddropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionbulkdraganddropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionbulkdraganddropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
