import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontentComponent } from './editcontent.component';

describe('EditcontentComponent', () => {
  let component: EditcontentComponent;
  let fixture: ComponentFixture<EditcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
