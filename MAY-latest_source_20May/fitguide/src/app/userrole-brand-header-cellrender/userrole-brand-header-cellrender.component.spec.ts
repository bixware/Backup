import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleBrandHeaderCellrenderComponent } from './userrole-brand-header-cellrender.component';

describe('UserroleBrandHeaderCellrenderComponent', () => {
  let component: UserroleBrandHeaderCellrenderComponent;
  let fixture: ComponentFixture<UserroleBrandHeaderCellrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserroleBrandHeaderCellrenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleBrandHeaderCellrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
