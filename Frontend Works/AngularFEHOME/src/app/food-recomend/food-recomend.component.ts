import { Component, OnInit } from '@angular/core';
import { progressUrl } from 'src/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-food-recomend',
  templateUrl: './food-recomend.component.html',
  styleUrls: ['./food-recomend.component.css']
})
export class FoodRecomendComponent implements OnInit {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  
  dataCumsume=[]
  dataIdeal=[]
  public barChartData: ChartDataSets[] = [
    { data:this.dataCumsume, label: 'Consumed cals' },
    { data: this.dataIdeal, label: 'Ideal cals' }
  ];
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
   
  constructor(private spinner: NgxSpinnerService) {

    this.spinner.show('sp2')
    this.spinner.show('sp')
   }

  ngOnInit() {

  if(sessionStorage.getItem('CustomerId')!=null){
    this.spinner.hide('sp');
  }else{
    console.log('-----')
  }
  fetch(progressUrl+sessionStorage.getItem('CustomerId')).then(res=>res.json()).then(data=>{
    // if(data!=null|| data!=undefined)
    // 
    console.log(data);
  if(data[0].startDate!=null||data[0].startDate!=undefined){  
    this.spinner.hide('sp2');
    
  }else{
    console.log("----reloading----")
    document.location.reload()
  }
  
    let curDate = new Date().getTime();
    let startDate=data[0].startDate;
    console.log(startDate);
    this.BMI=data[0].currentBMI
    this.BMR=data[0].currentBMR.toFixed(2)
    this.startDate=new Date(data[0].startDate).getDate()+"/"+(new Date(data[0].startDate).getMonth()+1)+"/"+new Date(data[0].startDate).getFullYear();
    this.endDate=new Date(data[0].targetDate).getDate()+"/"+(new Date(data[0].targetDate).getMonth()+1)+"/"+new Date(data[0].targetDate).getFullYear();
    this.targetWeight=data[0].targetWeight;
    this.startWeight=data[0].startWeight;
    
    if(data[0].onTrack==1){
      this.onTrack="YES";
    }else if(data[0].onTrack==1){
      this.onTrack="No";
    }else{
      this.onTrack="No";
    }
    this.dayCount=Math.floor((curDate-startDate)/86400000);
   
    console.log(this.dayCount)
     for(var day of data){
        this.caloriesCunsumed+=day.caloriesConsumed;
        if(this.dayCount>=day.day){
          this.barChartLabels.push("Day "+(day.day+1));
          this.dataCumsume.push(Math.floor(day.caloriesConsumed));
          this.dataIdeal.push(Math.floor(data[0].caloriesSupposedToBeConsumed));
      }
        if(day.day==this.dayCount){
          this.todayCaloriesCunsumed=day.caloriesConsumed.toFixed(2);
        }
    }
    this.barChartData = [
      { data:this.dataCumsume, label: 'Consumed cals' },
      { data: this.dataIdeal, label: 'Ideal cals' }
    ];
}).catch(()=>{
    console.log('error')
  // document.location.reload()
  })
  
  }

  

}
