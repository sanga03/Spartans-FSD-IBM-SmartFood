import { Injectable } from '@angular/core';
import { foodDetail, foodOrderInterface,foodInterface } from '../structures';

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
    console.log(food.foodName);
    let tempOrder:foodInterface ={
       customFoodId:food.customFoodId,
    customFoodImageLink:food.customFoodImageLink,
    price:food.price,
    quantity:1,
    name:food.foodName,
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
        sessionStorage.setItem('cart',JSON.stringify(foodOrds));
        console.log(sessionStorage.getItem('cart'));
    }

  else{
    console.log(sessionStorage.getItem('cart'));
  let  foodOrds:foodOrderInterface=JSON.parse(sessionStorage.getItem('cart'));
  let tempOrder:foodInterface ={
    customFoodId:food.customFoodId,
    customFoodImageLink:food.customFoodImageLink,
    price:food.price,
    quantity:1,
    name:food.foodName,
 }
// let  foodo:foodInterface[]=
let foodo:foodOrderInterface =JSON.parse(sessionStorage.getItem('cart'));
// console.log("0-------------------------") 
let foodInts:foodInterface[]=new Array();
let foodIntsFromSession:foodInterface[]=JSON.parse(String(foodo.foodorderid));
let flag:boolean=true;
for(let temfoo of foodIntsFromSession){
    if(temfoo.customFoodId==tempOrder.customFoodId){
      flag=false;
    }
foodInts.push(temfoo);
}
if(flag)
foodInts.push(tempOrder);
foodo.foodorderid=JSON.stringify(foodInts);
console.log(foodInts);
sessionStorage.setItem("cart",JSON.stringify(foodo));

  }
    
  }

}
