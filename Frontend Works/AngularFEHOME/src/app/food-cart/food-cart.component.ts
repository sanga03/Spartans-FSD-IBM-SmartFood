import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { foodOrderInterface, foodInterface } from '../structures';

@Component({
  selector: 'app-food-cart',
  templateUrl: './food-cart.component.html',
  styleUrls: ['./food-cart.component.css']
})
export class FoodCartComponent implements OnInit {

  constructor() { }
  // cartFormModel:new FormGroup({

  // });
  foodOrdered:foodOrderInterface;
  foodOrderList:foodInterface[];
  ngOnInit() {

    if(sessionStorage.getItem('cart')!='first'){
      this.foodOrderList = []
      this.foodOrdered=JSON.parse(sessionStorage.getItem('cart'));
      for(var food of  JSON.parse(String(this.foodOrdered.foodorderid))){
        this.foodOrderList.push(food);
      }

    }
  }

}