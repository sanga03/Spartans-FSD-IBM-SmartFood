import { Component, OnInit, Inject, NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgModel } from '@angular/forms';
import { async } from 'q';
import { foodOrderInterface, foodInterface } from '../structures';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurantList: restaurantResponse[][]=new Array();
  criteria:string;
  resList:restaurantResponse[]=new Array();
  customFoodList:customFoodResponse[][]=new Array();
  cfList:customFoodResponse[]=new Array();
  constructor(private router:Router,public dialog: MatDialog) { }

  ngOnInit() {   
    
    document.location.reload
    document.body.classList.add('res-bg-img');
    this.criteria = sessionStorage.getItem("criteria");
    if(this.criteria===null || this.criteria===undefined)
    {
      this.router.navigate(['home']);
    }
    let url = "http://b4ibm23.iiht.tech:8010/restaurant/findBy/"+this.criteria;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{ 
      console.log(data)
      let resList = data;
      let tempResList=[];
      if(sessionStorage.getItem("filterByRating")==null || sessionStorage.getItem("filterByRating")==undefined )
      {
           console.log("do nothing");
      }
      else
      {   console.log("inside res"); 
      console.log(sessionStorage.getItem("filterByRating"))
          let tempList:restaurantResponse[]=new Array();
          let k=0;
          for(let i=0;i<resList.length;i++)
          {
            if(resList[i].rating>= Number(sessionStorage.getItem("filterByRating")))
            {
                tempList[k++]=resList[i]
                console.log(tempList[k-1]);
            }
            else
            {
              resList.splice(i,1)
            }
          }
          resList=tempList;
        //   resList.filter(function(res,i) { 
        //   console.log("inside filrter")
        //   return res.rating >= Number(sessionStorage.getItem("filterByRating"));
        // });
        console.log(resList)
      }
       
      
      
      let tempRestaurantList:restaurantResponse[]=new Array();
      for(let i=0;i<Math.ceil(resList.length/4);i++)
        {
          for(let k=0;k<4 && k<resList.length-(i*4);k++)
              {
                tempRestaurantList[k]=resList[(i*4)+k];
              }
          this.restaurantList[i]=tempRestaurantList;
          tempRestaurantList=[];
        }
     
      
      console.log(this.restaurantList)
      
      sessionStorage.removeItem("filterByRating");
    }) 

     if( sessionStorage.getItem("filterByCategory")==null || sessionStorage.getItem("filterByCategory")==undefined) 
     {
       console.log("do nothing");
     }
     else
     {
        var c = sessionStorage.getItem("filterByCategory")
        this.filterByCategory(c)
        sessionStorage.removeItem("filterByCategory")
     }
  
  }

  openDialog() {
    
  } 

  async filterByCategory(category)
  {  var url = "http://b4ibm26.iiht.tech:1030/restaurant/category?a="
    await fetch(url+category)
     .then(res=>res.json())
     .then(data=>{
       console.log(data)
       this.resList=data;
       let tempRestaurantList:restaurantResponse[]=new Array();
       for(let i=0;i<Math.ceil(this.resList.length/4);i++)
         {
           for(let k=0;k<4 && k<this.resList.length-(i*4);k++)
               {
                 tempRestaurantList[k]=this.resList[(i*4)+k];
               }
           this.restaurantList[i]=tempRestaurantList;
           tempRestaurantList=[];
         }
     })
  }
  
 async showRestauratMenu(resUuid)
  {
    console.log(resUuid);
    var url = "http://b4ibm02.iiht.tech:8762/CFD/customFoodDetails"
    fetch(url)
    .then(res=>res.json())
    .then(data => 
      {  
          let tempCustomFoodList:customFoodResponse[];
          tempCustomFoodList = data;
          this.cfList=[];
          this.customFoodList=[];
          let i = 0;
          tempCustomFoodList.forEach(customFood=>
            {  
              if(resUuid==customFood.restaurantUuid)
              {  
                this.cfList[i]=customFood;
                console.log(customFood);
                i++;
              }
            }) 
            // fetch("http://b4ibm02.iiht.tech:8762/food/food/id/"+this.cfList[i].foodUuid).then(res=>res.json()).then(data=>{
            //          console.log(data);
            //     this.cfList[i].name = data.name;
            //     }).then(()=>
            //     {
                  
            //     })

          //     let tempCFList:customFoodResponse[]=new Array();
          //     for(let i=0;i<Math.ceil(this.cfList.length/2)-1;i++)
          //       {
          //         for(let k=0;k<4 && k<this.cfList.length-(i*2);k++)
          //             {
          //               tempCFList[k]=this.cfList[(i*2)+k];
          //             }
          //         this.customFoodList[i]=tempCFList;
          //         tempCFList=[];
          //       }
          //       console.log(this.customFoodList);

         
          // console.log(this.customFoodList);
          // this.dialog.open(DialogDataExampleDialog, {
          //   data: 
          //   this.customFoodList
            
          }).then(()=>{  

            this.cfList.forEach((customFood)=>{  

               fetch("http://b4ibm02.iiht.tech:8762/food/food/id/"+customFood.foodUuid)
               .then(res=>res.json())
               .then(data=>{
                     console.log(data);
                customFood.name = data.name;
                })
                   
            })

          }).then(()=>{
            let tempCFList:customFoodResponse[]=new Array();
            for(let i=0;i<Math.ceil(this.cfList.length/2)-1;i++)
              {
                for(let k=0;k<4 && k<this.cfList.length-(i*2);k++)
                    {
                      tempCFList[k]=this.cfList[(i*2)+k];
                    }
                this.customFoodList[i]=tempCFList;
                tempCFList=[];
              }
              console.log(this.customFoodList);

       
          console.log(this.customFoodList);
           this.dialog.open(DialogDataExampleDialog, {
            data: 
            this.customFoodList
          })
      
       })

  }
}


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  flag:number=0;
  cartOrder:foodOrderInterface = {
    restId:"",
    date: String(new Date().getTime()),
    uorderId :"",
    customerId:"",
    foodorderid:"",
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: customFoodResponse,private router:Router) {}

  addToCart(customFood:customFoodResponse)
  {    let food:foodInterface={
              customFoodId:customFood.uuid,
              customFoodImageLink:customFood.imageLink,
              price:customFood.price,
              quantity:1,
              name:customFood.name
            
            }
        this.cartOrder.restId=customFood.restaurantUuid;

       if(sessionStorage.getItem("cartItems")==undefined || sessionStorage.getItem("cartItems")==null)


       {
         sessionStorage.setItem("cartItems",JSON.stringify([food]));
         document.getElementById("showProduct").innerText = String(Number(document.getElementById("showProduct").innerText) + 1);
       }
       else
       { 
         let foodList:foodInterface[] = JSON.parse(sessionStorage.getItem("cartItems"));
         foodList.forEach((foodItem)=>{
            if(foodItem.customFoodId==food.customFoodId)
            {
                this.flag=1;
                console.log("flag set")
            }  
         })
         if(this.flag==0)
         { console.log("pushed")
           foodList.push(food);
           console.log(foodList);
           console.log(document.getElementById("showProduct").innerText)
           document.getElementById("showProduct").innerText = String(Number(document.getElementById("showProduct").innerText) + 1);
           console.log(document.getElementById("showProduct").innerText)
         }
         
         sessionStorage.setItem("cartItems",JSON.stringify(foodList));
         this.flag=0;
       }
   
      
  } 
  directToCart()
  {   if(sessionStorage.getItem("email")==null || sessionStorage.getItem("email")==undefined)
        {
        
              let cartSummary:foodInterface[];
              let cartItems = sessionStorage.getItem("cartItems")
             
            if(cartItems==null || cartItems == undefined)
            {
              console.log("do nothing")
            }
            else
            { let i=0;

              JSON.parse(sessionStorage.getItem("cartItems")).forEach(cartItem => { 

                  if(cartSummary==null || cartSummary == undefined)
                  { 
                   // cartOrder.restId=cartItem.
                    cartSummary=[cartItem];
                    i++;

                  }
                  else
                  {
                    cartSummary[i]=cartItem;
                    i++;
                  }
                })
              };
              this.cartOrder.foodorderid=JSON.stringify(cartSummary);
              sessionStorage.setItem("cart",JSON.stringify(this.cartOrder));
              this.router.navigate(['login'])
         }
         else{ 
           this.cartOrder = JSON.parse(sessionStorage.getItem("cart"));
           console.log(this.cartOrder);
           this.cartOrder.customerId = sessionStorage.getItem("CustomerId");
           sessionStorage.setItem("cart",JSON.stringify(this.cartOrder));
           this.router.navigate(['cart'])
         }
          
            
   } 
          
    
}
export interface restauratRequest
{
  name: string;
	contact:number;
	rating: number;
	location: string;
  co_ordinates: string;
}

export interface restaurantResponse
{
  name: string;
	contact:number;
	rating: number;
	location: string;
  co_ordinates: string;
  resId: string;
  image: string; 

}

export interface customFoodResponse
{
   name:String;
    uuid: String,
    quantity: String,
    imageLink: String,
    price:number,
    rating: number,
    foodUuid: string,
    restaurantUuid: string

}

export interface foodInterface{
  customFoodId:String;
  customFoodImageLink:String;
  price:number;
  quantity:number;
  name:String;

//   restId:String;
//   date:String;
//   uorderId :String;
//   customerId:String;
//   foodorderid:String[];

}
export interface foodOrderInterface{
  restId:String;
  date:String;
  uorderId :String;
  customerId:String;
  foodorderid:String;
}

// let foodList = [0,1,2,3,4,5,6,7,8,9,10]
// let restaurantList:number[][];
// let tempRestaurantList:number[];

// function pushToList(list,item)
// {
//    if(list==null || list==undefined)
//    {
//       list = [item]
//    }
//    else{
//      list.push(item)
//    }
//    return list
// }

// for(let i=0;i<foodList.length;i++)
// {
//    if((i+4)>foodList.length)
//    {
//      for(i;i<foodList.length;i++)
//      {
//        tempRestaurantList=pushToList(tempRestaurantList,foodList[i]);
       
//      }
//     //  console.log(tempRestaurantList);
//      restaurantList[i/4]=pushToList(restaurantList,tempRestaurantList)
//      break;
//    }
//    tempRestaurantList=pushToList(tempRestaurantList,foodList[i])
//   //  console.log(tempRestaurantList);
//    if((i+1)%4==0)
//    {
//        restaurantList=pushToList(restaurantList,tempRestaurantList)
//        tempRestaurantList=[];
//    }
// }

// console.log(restaurantList);

