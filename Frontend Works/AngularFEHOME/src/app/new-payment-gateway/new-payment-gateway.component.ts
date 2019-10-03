import { Component, OnInit } from '@angular/core';
// import { NgXCreditCardsModule } from 'ngx-credit-cards';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CreditCardValidator } from 'ngx-credit-cards';
import { IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-new-payment-gateway',
  templateUrl: './new-payment-gateway.component.html',
  styleUrls: ['./new-payment-gateway.component.css']
})
export class NewPaymentGatewayComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;

   formBuilder = new FormBuilder();
  formGroup: any;
  resetStatus: any;
  showError: boolean;
  showCancel: boolean;
  showSuccess: boolean;

  constructor() {
   
   }
  
  
  ngOnInit() {
    this.initConfig();
  this.formGroup = this.formBuilder.group({
    cardNumber: new FormControl('', [CreditCardValidator.validateCardNumber]),
    cardExpDate:new FormControl('', [CreditCardValidator.validateCardExpiry]),
    cardCvv: new FormControl('', [CreditCardValidator.validateCardCvc])
    // cardName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
  });
  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
}

}
