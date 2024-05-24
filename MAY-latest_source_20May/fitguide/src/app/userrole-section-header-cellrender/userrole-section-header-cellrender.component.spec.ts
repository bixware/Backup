import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleSectionHeaderCellrenderComponent } from './userrole-section-header-cellrender.component';

describe('UserroleSectionHeaderCellrenderComponent', () => {
  let component: UserroleSectionHeaderCellrenderComponent;
  let fixture: ComponentFixture<UserroleSectionHeaderCellrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserroleSectionHeaderCellrenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleSectionHeaderCellrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
