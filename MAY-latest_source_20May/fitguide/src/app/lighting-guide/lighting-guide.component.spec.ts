import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingGuideComponent } from './lighting-guide.component';

describe('LightingGuideComponent', () => {
  let component: LightingGuideComponent;
  let fixture: ComponentFixture<LightingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightingGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
