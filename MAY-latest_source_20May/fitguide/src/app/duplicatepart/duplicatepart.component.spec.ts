import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatepartComponent } from './duplicatepart.component';

describe('DuplicatepartComponent', () => {
  let component: DuplicatepartComponent;
  let fixture: ComponentFixture<DuplicatepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
