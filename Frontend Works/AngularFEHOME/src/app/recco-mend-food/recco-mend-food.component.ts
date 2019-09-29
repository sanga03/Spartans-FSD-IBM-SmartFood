import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recco-mend-food',
  templateUrl: './recco-mend-food.component.html',
  styleUrls: ['./recco-mend-food.component.css']
})
export class ReccoMendFoodComponent implements OnInit {

  constructor() { }

  dFoodDetails:dfoodDetails[]=new Array();

  ngOnInit() {
    
  let durl="http://b4ibm02.iiht.tech:9002/getDefaultFoods";
  fetch(durl).then(res=>res.json()).then(data=>{
    console.log(data);
    this.dFoodDetails=data;
  })

  
  }


}


export interface foodDetail{
  customFoodImageLink:String;
  price:number;
  quantity:number;
  rating:number;
  calories:number;
  foodName:String;
  cuisine:String;
  category:boolean;
  priority:number;
  distance:number;
}
export interface dfoodDetails{
  calories:number;
category: boolean;
cuisine: String;
customFoodImageLink: String;
foodName: String;
price:number;
quantity:String;
rating: number;
}
