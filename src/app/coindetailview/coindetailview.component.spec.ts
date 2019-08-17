import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoindetailviewComponent } from './coindetailview.component';

describe('CoindetailviewComponent', () => {
  let component: CoindetailviewComponent;
  let fixture: ComponentFixture<CoindetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoindetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoindetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
