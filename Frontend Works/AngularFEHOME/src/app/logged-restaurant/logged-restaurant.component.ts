import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-logged-restaurant',
  templateUrl: './logged-restaurant.component.html',
  styleUrls: ['./logged-restaurant.component.css']
})
export class LoggedRestaurantComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  @ViewChild('closeModal',undefined) closeModal:ElementRef;
  flag:number=0;
  cartOrder:foodOrderInterface = {
    restId:"",
    date: String(new Date().getTime()),
    uorderId :"",
    customerId:"",
    foodorderid:"",
  }
  restaurantList: restaurantResponse[][]=new Array();
  criteria:string;
  resList:restaurantResponse[]=new Array();
  customFoodList:customFoodResponse[][]=new Array();
  cfList:customFoodResponse[]=new Array();
  userName:string;
  email:string;
  customerObj:any
  customerPhysicalDetail:physicalModel = {
    height:0,
    weight:0,
    dob:new Date(),
    gender:"male",
    caloriesBurn:134,
    upuuid:"0",
    bmr: 0,
  }
  physicalDetailForm =  new FormGroup({
   height: new FormControl(Number(sessionStorage.getItem("height"))),
   weight: new FormControl(Number(sessionStorage.getItem("weight")) ),
   gender: new FormControl(Number(sessionStorage.getItem("gender"))),
   dob: new FormControl(new Date(sessionStorage.getItem("dob"))),
   caloriesBurn: new FormControl('') })

   activityLevel = [
    {value: '1.2', viewValue: 'Sedentary (Office Job)'},
    {value: '1.375', viewValue: 'Light Exercise (1-2 days/per week) '},
    {value: '1.55', viewValue: 'Moderate Exercise (3-5 days/per week) '},
    {value: '1.725', viewValue: 'Heavy Exercise (6-7 days/per week) '},
    {value: '1.9', viewValue: 'Athlete (2 x Per day) '}
  ];
  
  isLinear = false;
  mealTimeFormGroup: FormGroup;
  caloriesFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  mealTime = ["Breakfast","Lunch","Dinner"];
  calories = ["Light","Medium","Heavy"];
  constructor(private router:Router,public dialog: MatDialog,private _formBuilder: FormBuilder) { }

  ngOnInit() {   
    
    // document.location.reload
   
    document.body.classList.add('res-bg-img');
    this.mealTimeFormGroup = this._formBuilder.group({
      mealTime: ['', Validators.required]
      });
    this.caloriesFormGroup = this._formBuilder.group({
      calories: ['', Validators.required]
      });
    this.dateFormGroup = this._formBuilder.group({
      date: ['']
      });
     this.email = sessionStorage.getItem('email');
     console.log(this.email);
     if(this.email==null)
     {
       this.router.navigate(['home']);
     }
     var url = "http://b4ibm02.iiht.tech:8762/account/findEmail?email="+this.email;
     
     console.log(url);
     fetch(url).then(res=>res.json())
       .then(data=>
         {  
           this.customerObj=data;
           this.userName=data.name;
           sessionStorage.setItem("CustomerId",this.customerObj.uid);
         }).then(() => {
  
           var phyUrl = "http://b4ibm29.iiht.tech:1234/physicalDetails/byCustomer/"+this.customerObj.uid;
           fetch(phyUrl).then(res=>res.json())
         .then(data=>
           {  
             this.customerPhysicalDetail.height = data.height;
             this.customerPhysicalDetail.weight=data.weight;
             this.customerPhysicalDetail.caloriesBurn=data.caloriesBurn;
             this.customerPhysicalDetail.dob=new Date(data.dob)
             this.customerPhysicalDetail.gender=data.gender
             this.customerPhysicalDetail.upuuid=data.upuuid;
             this.customerPhysicalDetail.bmr=data.bmr;
             sessionStorage.setItem("height",String(this.customerPhysicalDetail.height));
             sessionStorage.setItem("upuuid",this.customerPhysicalDetail.upuuid);
             sessionStorage.setItem("weight",String(this.customerPhysicalDetail.weight));
             
             if(this.customerPhysicalDetail.gender=="MALE")
             {
                sessionStorage.setItem("gender",String("0"));
             }
             else{
               sessionStorage.setItem("gender",String("1"));
             }
             sessionStorage.setItem("dob",String(this.customerPhysicalDetail.dob));
             sessionStorage.setItem("caloriesBurn",String(this.customerPhysicalDetail.caloriesBurn));
             console.log(data);
             this.physicalDetailForm =  new FormGroup({
               height: new FormControl(this.customerPhysicalDetail.height),
               weight: new FormControl( this.customerPhysicalDetail.weight),
               gender: new FormControl( this.customerPhysicalDetail.gender),
               dob: new FormControl(this.customerPhysicalDetail.dob),
               caloriesBurn: new FormControl('') })
             let today:Date = new Date();
            if(today.getFullYear()==this.customerPhysicalDetail.dob.getFullYear()) 
            {
              
            }
            else{
              (<HTMLInputElement>document.getElementById('dob')).readOnly = true;
            }
           })
        })
  
    let rurl = "http://b4ibm26.iiht.tech:1030/restaurant/display";
    fetch(rurl)
    .then(res=>res.json())
    .then(data=>{ 
      console.log(data)
      this.resList = data;
      let tempRestaurantList:restaurantResponse[]=new Array();
      for(let i=0;i<Math.ceil(this.resList.length/4);i++)
        {
          for(let k=0;k<4 && k<this.resList.length-(i*4);k++)
              { if(String(this.resList[(i*4)+k].price)=="NaN")
                {
                  this.resList[(i*4)+k].price==0;
                }
                else{
                  this.resList[(i*4)+k].price=Math.ceil(this.resList[(i*4)+k].price)
                }
               
                console.log(this.resList[(i*4)+k])
                tempRestaurantList[k]=this.resList[(i*4)+k];
              }
          this.restaurantList[i]=tempRestaurantList;
          tempRestaurantList=[];
        }
        if( sessionStorage.getItem("filterByRating")==null || sessionStorage.getItem("filterByRating")==undefined) 
        {
          console.log("do nothing in price range");
        }
        else
        { console.log("inside price range function")
       
           var min = sessionStorage.getItem("filterByRating")
           console.log(min)
           this.filterByRating(min)
           sessionStorage.removeItem("filterByRating")
       } 
      if( sessionStorage.getItem("priceRange")==null || sessionStorage.getItem("priceRange")==undefined) 
     {
       console.log("do nothing in price ranfe");
     }
     else
     { console.log("inside price range function")
    
        var max = sessionStorage.getItem("priceRange")
        console.log(max)
        this.filterByRange(max)
        sessionStorage.removeItem("priceRange")
     } 
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
     
      
      console.log(this.restaurantList)
    }) 
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
  async filterByRange(max)
  {
    var url = "http://b4ibm26.iiht.tech:1030/restaurant/price"
    await fetch(url,
      {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
         "min": 0      ,
         "max": Number(max)
        })
       })
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

         console.log(this.restaurantList);
     })
  }  
  async filterByRating(min)
  {
    var url = "http://b4ibm26.iiht.tech:1030/restaurant/rating"
    await fetch(url,
      {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
         "min": Number(min)     ,
         "max": 5
        })
       })
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

         console.log(this.restaurantList);
     })
  }  
 async showRestauratMenu(resUuid)
  {
    console.log(resUuid);
    var url = "http://b4ibm02.iiht.tech:8762/CFD/customFoodDetails"
   await  fetch(url)
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
              this.openModal.nativeElement.click();
       
         
       })

  }

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
        
        
           this.cartOrder = JSON.parse(sessionStorage.getItem("cart"));
           console.log(this.cartOrder);
           this.cartOrder.customerId = sessionStorage.getItem("CustomerId");
           sessionStorage.setItem("cart",JSON.stringify(this.cartOrder));
           this.openModal.nativeElement.click();
           this.router.navigate(['cart'])
         
          }
            
   
          

  closeAndRedirectToHome()
  {
    this.openModal.nativeElement.click();
    this.router.navigate(['lgRestaurant'])
  }
  redirectToProfile()
  {
    this.router.navigate(['foodHome'])
  }
  redirectToHome()   
 {  
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('cart');
    window.sessionStorage.clear();
    this.router.navigate(['home']);
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
  price: number;

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

}
export interface foodOrderInterface{
  restId:String;
  date:String;
  uorderId :String;
  customerId:String;
  foodorderid:String;
}
export interface physicalModel 
{
 height:number;
 weight:number;
 dob:Date;
 gender:string
 caloriesBurn:number;
 upuuid:string;
 bmr:number
} 
