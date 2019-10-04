import { Component, OnInit } from '@angular/core';
import { progressUrl } from 'src/utils';

@Component({
  selector: 'app-food-recomend',
  templateUrl: './food-recomend.component.html',
  styleUrls: ['./food-recomend.component.css']
})
export class FoodRecomendComponent implements OnInit {
  dayCount: number;
  caloriesCunsumed:number;
  todayCaloriesCunsumed: any;
  BMR: any;
  BMI: any;
  startDate: any;
  endDate: any;
  targetWeight: any;
  startWeight: any;
  onTrack: any;
  constructor() { }

  ngOnInit() {
  
  
  fetch(progressUrl+sessionStorage.getItem('CustomerId')).then(res=>res.json()).then(data=>{
    console.log(data);
    let curDate = new Date().getTime();
    let startDate=data[0].startDate;
    console.log(startDate);
    this.BMI=data[0].currentBMI
    this.BMR=data[0].currentBMR.toFixed(2)
    // console.log(curDate-startDate)
    this.startDate=new Date(data[0].startDate).getDate()+"/"+(new Date(data[0].startDate).getMonth()+1)+"/"+new Date(data[0].startDate).getFullYear();
    this.endDate=new Date(data[0].targetDate).getDate()+"/"+(new Date(data[0].targetDate).getMonth()+1)+"/"+new Date(data[0].targetDate).getFullYear();
    this.targetWeight=data[0].targetWeight;
    this.startWeight=data[0].startWeight;
    this.onTrack=data[0].onTrack;
    this.dayCount=Math.floor((curDate-startDate)/86400000);
    console.log(this.dayCount)
     for(var day of data){
        this.caloriesCunsumed+=day.caloriesConsumed;
        if(day.day==this.dayCount){
          this.todayCaloriesCunsumed=day.caloriesConsumed.toFixed(2);
        }
    }
  })
  
  }

  

}
