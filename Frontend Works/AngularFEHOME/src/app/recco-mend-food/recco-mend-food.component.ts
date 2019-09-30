import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-recco-mend-food',
  templateUrl: './recco-mend-food.component.html',
  styleUrls: ['./recco-mend-food.component.css']
})
export class ReccoMendFoodComponent implements OnInit {

  constructor() { }

  dFoodDetails:dfoodDetails[]=new Array();
  oFoodDetails:foodDetail[] = new Array();
  arrayFoodDetail:foodDetail[][]=new Array();
  rowCalc:number=0;
  

  ngOnInit() {
    console.log(sessionStorage.getItem('email'));
    console.log(sessionStorage.getItem('CustomerId'))
    let cUId=sessionStorage.getItem('CustomerId');
    console.log('asdads');
  let durl="http://b4ibm02.iiht.tech:9002/getDefaultFoods";
  let orginUrl="http://b4ibm02.iiht.tech:9002/getPersonalFoods/"+cUId+"/fummy";

  // // for dummy foods 
  // fetch(durl).then(res=>res.json()).then(data=>{
  //   console.log(data);
  //   this.dFoodDetails=data;
  //   for(let i:number =0 ;i<this.dFoodDetails.length;i++){
  //     this.dFoodDetails[i].favRating=new Array(this.dFoodDetails[i].rating);
  //    }
    
  // })


  fetch(orginUrl).then(res=>res.json()).then(data=>{
    console.log(data);
    this.oFoodDetails=data;
    // this.arrayFoodDetail=new Array(Math.floor(this.oFoodDetails.length/3));
    this.arrayFoodDetail=[]
    for(let i:number =0 ;i<this.oFoodDetails.length;i=i+3){
    this.arrayFoodDetail[i]=[]
    console.log("hkjlnml")
    }
    for(let i:number =0 ;i<this.oFoodDetails.length;i++){
    
      this.oFoodDetails[i].favRating=new Array(this.oFoodDetails[i].rating);
      if(i%3==0){
      this.arrayFoodDetail[Math.floor(i/3)]=[]
      console.log("adas")
      }
        this.arrayFoodDetail[Math.floor(i/3)].push(this.oFoodDetails[i]);
      
     }
     console.log(this.arrayFoodDetail)
    
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
  favRating:Number[];
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
  favRating:Number[];
}
