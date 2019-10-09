import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { foodOrderInterface, foodInterface } from '../structures';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { orderUrl } from 'src/utils';

@Component({
  selector: 'app-food-cart',
  templateUrl: './food-cart.component.html',
  styleUrls: ['./food-cart.component.css']
})
export class FoodCartComponent implements OnInit {

  constructor(private router: Router) { }
  // cartFormModel:new FormGroup({

  // });
  foodOrdered:foodOrderInterface;
  foodOrderList:foodInterface[];
  tp:number=0;
  ngOnInit() {
    document.body.classList.add('bg-img');

    if(sessionStorage.getItem('cart')!='first'){
      this.foodOrderList = []
      this.foodOrdered=JSON.parse(sessionStorage.getItem('cart'));
      for(var food of  JSON.parse(String(this.foodOrdered.foodorderid))){
        this.foodOrderList.push(food);
      
        this.tp+=food.price;
        console.log(food);
      }

    }
    else{
      this.router.navigate(['home']);
    }
  }

  changeCartSummary(customFoodId,ch)
  {
    
console.log('-------------------------------')
    console.log(customFoodId)
    let i=0;
      for(let fd of this.foodOrderList){
        if(customFoodId==fd.customFoodId){
          console.log(fd.customFoodId)
          if(ch==0){
            this.foodOrderList[i].quantity--;

            if( this.foodOrderList[i].quantity<0){
              this.foodOrderList[i].quantity=0;
            }else{
              this.tp-= fd.price;
            }
          }else{
            this.foodOrderList[i].quantity++;
            this.tp+= fd.price;
          }
        }
        i++;
      }
  }
  proceedCheckout(){

    console.log('*********************************************')

    let customFoodIds:String[]=[]
    for(var originalFood of JSON.parse(String(this.foodOrdered.foodorderid))){
console.log(originalFood);
 
    for(var updatedFood of this.foodOrderList){
      // console.log(updatedFood.quantity)
      console.log(updatedFood)

        if(originalFood.customFoodId==updatedFood.customFoodId){
       console.log(updatedFood.quantity)
          for(let i=0;i<updatedFood.quantity;i++){
            customFoodIds.push(originalFood.customFoodId)
        }

    }
  }
}


console.log('-------------------------------')
console.log(customFoodIds);
console.log(JSON.stringify(customFoodIds));
// this.foodOrdered.foodorderid=customFoodIds;

    // console.log(this.foodOrdered);
console.log(JSON.stringify(this.foodOrdered));
if(customFoodIds.length<1)
{
  alert('cart is empty')
}else{
    fetch(orderUrl,{
      method: 'POST',
      headers:{
          'content-type':'application/json'
      },
      body: JSON.stringify( {
        
          "restId":this.foodOrdered.restId,
                 "date": this.foodOrdered.date,
                 "uorderId":"",
                 "customerId": this.foodOrdered.customerId,
                 "foodorderid": customFoodIds
                }
       )
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)

  })

  sessionStorage.setItem('cart','first');
   this.router.navigate(['new-payment'])

      }
  

    }


}