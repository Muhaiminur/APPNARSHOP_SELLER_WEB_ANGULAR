import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRattingComponent } from './seller-ratting.component';

describe('SellerRattingComponent', () => {
  let component: SellerRattingComponent;
  let fixture: ComponentFixture<SellerRattingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerRattingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
