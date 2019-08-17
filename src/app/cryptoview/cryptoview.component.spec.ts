import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoviewComponent } from './cryptoview.component';

describe('CryptoviewComponent', () => {
  let component: CryptoviewComponent;
  let fixture: ComponentFixture<CryptoviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
