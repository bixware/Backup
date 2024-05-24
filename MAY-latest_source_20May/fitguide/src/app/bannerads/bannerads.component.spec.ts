import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneradsComponent } from './bannerads.component';

describe('BanneradsComponent', () => {
  let component: BanneradsComponent;
  let fixture: ComponentFixture<BanneradsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanneradsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanneradsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
