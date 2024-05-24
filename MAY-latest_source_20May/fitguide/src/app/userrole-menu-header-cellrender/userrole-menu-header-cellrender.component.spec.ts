import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleMenuHeaderCellrenderComponent } from './userrole-menu-header-cellrender.component';

describe('UserroleMenuHeaderCellrenderComponent', () => {
  let component: UserroleMenuHeaderCellrenderComponent;
  let fixture: ComponentFixture<UserroleMenuHeaderCellrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserroleMenuHeaderCellrenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleMenuHeaderCellrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
