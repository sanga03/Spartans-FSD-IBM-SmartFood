import { Injectable } from '@angular/core';
import { foodDetail, foodOrderInterface,foodInterface } from '../structures';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor() { }

  pushToCart(food:foodDetail){
    console.log(food);
    console.log(sessionStorage.getItem('cart'))
    if(sessionStorage.getItem('cart')=="first"){
      
   let   foodOrds:foodOrderInterface ;
    let oop:foodInterface[]=[]
    let tempOrder:foodInterface ={
       customFoodId:food.customFoodId,
    customFoodImageLink:food.customFoodImageLink,
    price:food.price,
    quantity:1
    }
    oop.push(tempOrder)
    console.log(sessionStorage.getItem('CustomerId'));
    foodOrds={
    foodorderid:JSON.stringify(oop),
    customerId:sessionStorage.getItem('CustomerId'),
    uorderId:"FO"+Math.random()*1000,
    date:String(new Date().getTime()),
    restId:"temp"
  }
        sessionStorage.setItem("cart",JSON.stringify(foodOrds));
    }

  else{
  let  foodOrds:foodOrderInterface= JSON.parse(sessionStorage.getItem('cart'));
  let tempOrder:foodInterface ={
    customFoodId:food.customFoodId,
 customFoodImageLink:food.customFoodImageLink,
 price:food.price,
 quantity:1
 }
// let  foodo:foodInterface[]=
let foodo:foodOrderInterface =JSON.parse(sessionStorage.getItem('cart'));
console.log("0-------------------------") 
let foodInts:foodInterface[]=new Array();
foodInts.push(JSON.parse(foodo.foodorderid));
foodInts.push(tempOrder);
console.log(foodInts)
console.log("0-------------------------") 
console.log(JSON.parse(foodo.foodorderid));
foodo.foodorderid=JSON.stringify(foodInts);

sessionStorage.setItem("cart",foodo);
console.log(sessionStorage.getItem("cart"));
  

  }
    
  }

}
