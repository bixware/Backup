import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecmsComponent } from './updatecms.component';

describe('UpdatecmsComponent', () => {
  let component: UpdatecmsComponent;
  let fixture: ComponentFixture<UpdatecmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
