import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurantList: restaurantResponse[][]=new Array();
  criteria:string;
  resList:restaurantResponse[]=new Array();
  constructor(private router:Router) { }

  ngOnInit() {   
    document.location.reload
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
     
      
      console.log(this.restaurantList);
    })
  
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

