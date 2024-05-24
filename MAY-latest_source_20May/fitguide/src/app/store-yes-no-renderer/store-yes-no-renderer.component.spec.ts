import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreYesNoRendererComponent } from './store-yes-no-renderer.component';

describe('StoreYesNoRendererComponent', () => {
  let component: StoreYesNoRendererComponent;
  let fixture: ComponentFixture<StoreYesNoRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreYesNoRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreYesNoRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
