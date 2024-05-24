import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionmasterComponent } from './sectionmaster.component';

describe('SectionmasterComponent', () => {
  let component: SectionmasterComponent;
  let fixture: ComponentFixture<SectionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
