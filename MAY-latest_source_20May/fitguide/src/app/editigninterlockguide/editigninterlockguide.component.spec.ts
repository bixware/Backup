import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditigninterlockguideComponent } from './editigninterlockguide.component';

describe('EditigninterlockguideComponent', () => {
  let component: EditigninterlockguideComponent;
  let fixture: ComponentFixture<EditigninterlockguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditigninterlockguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditigninterlockguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
