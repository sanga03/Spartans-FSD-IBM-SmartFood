import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentGatewayComponent } from './new-payment-gateway.component';

describe('NewPaymentGatewayComponent', () => {
  let component: NewPaymentGatewayComponent;
  let fixture: ComponentFixture<NewPaymentGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
