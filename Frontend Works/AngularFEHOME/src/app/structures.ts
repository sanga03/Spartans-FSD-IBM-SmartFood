
export interface foodDetail{
    customFoodId:String;
    restaurantName:String;
    restaurantId:String;
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
    foodorderid:String; //[array of customFood Id]
}

export var guestUser:number = 0;