import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudetailComponent } from './menudetail.component';

describe('MenudetailComponent', () => {
  let component: MenudetailComponent;
  let fixture: ComponentFixture<MenudetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenudetailComponent]
    });
    fixture = TestBed.createComponent(MenudetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
