import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Wallet',
    children: [
      {name: 'Paytm'},
      {name: 'PhonePe'},
    ]
  }, {
    name: 'UPI',
    children: [
        {name: 'PaytmUpi'},
        {name: 'Google'}
      ]
    }, {
      name: 'card',
      children: [
          {name: 'card'},
        ]
      },
      {
        name: 'cod',
        children: [
            {name: 'cod'},
          ]
        },
        {
          name: 'paypal',
          children: [
              {name: 'paypal'},
            ]
          }
    ]
 
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  form1: any
  form2: any
  form3: any
  form4: any
  form5 : any
}

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  
  ngOnInit() {
  }
  

  public show = {
    paytm : false,
    phonepe : false,
    paytmUpi : false,
    gpay : false,
    cod : false ,
    card : false,
    paypal : false
  }

  public flag:String = "";

  private router:Router;

  clicker(name:String){

// document.location.reload();

    this.show.paytm = false;
    this.show.phonepe = false;
    this.show.paytmUpi = false;
    this.show.gpay = false;
    this.show.cod =false;
    this.show.card = false;
    this.show.paypal = false;

    if(name == 'Paytm')
    {
     this.flag = 'paytm';
    this.show.paytm = true;
    }
    else if(name == 'PhonePe')
    {
      this.flag = 'phonepe';
      this.show.phonepe = true;
    }
    else if(name == 'PaytmUpi')
    {
      this.flag = 'phonepe';
      this.show.paytmUpi = true;
    }
    else if(name == 'Google')
    {
      this.flag = 'phonepe';
      this.show.gpay = true;
    }
    else if(name == 'card')
    {
      this.flag = 'phonepe';
      this.show.card = true;
    }
    else if(name == 'cod')
    {
      this.flag = 'cod';
      this.show.cod = true;
      alert("thank you for ordering at smart food");
    }
    else if(name == 'paypal')
    {
      this.flag = 'paypal';
      this.show.paypal = true;
    }
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  

 onSubmit1(form1){
  alert("your payment was received through Paytm.Thank you for orderding from smart food");
 }

 onSubmit2(form2){
  alert("your payment was received through PhonePe.Thank you for orderding from smart food");
 }

 onSubmit3(form3){
  alert("your payment was received through PaytmUpi.Thank you for orderding from smart food");
 }

 onSubmit4(form4){
  alert("your payment was received through Google Pay.Thank you for orderding from smart food");
 }

 onSubmit5(form5){
  alert("your payment was received through your bank.Thank you for orderding from smart food");
 }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(router:Router,private formBuilder: FormBuilder) {
    this.dataSource.data = TREE_DATA;
    this.router = router;
  }

  

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  

}
