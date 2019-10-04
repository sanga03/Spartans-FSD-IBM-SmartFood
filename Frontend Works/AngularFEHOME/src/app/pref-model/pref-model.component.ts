import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ObjectUnsubscribedError } from 'rxjs';
import * as _moment from 'moment';

// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-pref-model',
  templateUrl: './pref-model.component.html',
  styleUrls: ['./pref-model.component.css']
  // ,
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {provide: DateAdapter, useClass: PrefModelComponent, deps: [MAT_DATE_LOCALE]},

  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ]
})

export class PrefModelComponent implements OnInit {

  email:String;
  customerObj:any;
  options = [
    {
      display: 'Indian',
      value: 'Indian'
    }, {
      display: 'Italian',
      value: 'Italian'
    }, {
      display: 'Japnese',
      value: 'Japnese'
    }, {
      display: 'North indian',
      value: 'North indian'
    }, {
      display: 'South Indian',
      value: 'South indian'
    }, {
      display: 'Chinese',
      value: 'chinese'
    }
  ];
   oops=["dasd",
  "sdada","asdadad"]
  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }
  customerPrefDetail:prefModel={
    uuuid:"uuuid",
    category:0,
    startDate:new Date().getTime(),
    targetDate:new Date().getTime(),
    targetWeight:0,
    cusines:[]
    }



    preferenceModel=new FormGroup({
      selected: new FormControl(JSON.parse(sessionStorage.getItem("prcusines"))),
      targetW:new FormControl(sessionStorage.getItem("prtargetWeight")),
      targetD:new FormControl((new Date(Number(sessionStorage.getItem("prtargetDate"))))),
      category:new FormControl(Number(sessionStorage.getItem("prcategory")))
     })
  ngOnInit() {
    if(sessionStorage.getItem("prtargetWeight")=="0"){
        document.location.reload();
    }
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
         
       }).then(()=>{
         let getPrefUrl="http://localhost:8041/pref/"+this.customerObj.uid;
        fetch(getPrefUrl).then(res=>res.json()).then(prefObj=>{
            this.customerPrefDetail.category=prefObj.category;
            this.customerPrefDetail.targetWeight=prefObj.targetWeight;
            this.customerPrefDetail.targetDate=prefObj.targetDate;
            this.customerPrefDetail.startDate=prefObj.startDate;
            this.customerPrefDetail.cusines=prefObj.cusines;
            this.customerPrefDetail.uuuid=prefObj.uuuid;
            sessionStorage.setItem("prcategory",String( this.customerPrefDetail.category));
            sessionStorage.setItem("prtargetWeight",String( this.customerPrefDetail.targetWeight));
            sessionStorage.setItem("prtargetDate",String( this.customerPrefDetail.targetDate));
            sessionStorage.setItem("prstartDate",String( this.customerPrefDetail.startDate));
            sessionStorage.setItem("prcusines",JSON.stringify( this.customerPrefDetail.cusines));
            sessionStorage.setItem("pruuuid",String( this.customerPrefDetail.uuuid));
            console.log(prefObj);
            
            // document.location.reload();
        })
      
      
        })
   
  }

  setPreferenceDetail(){
    console.log(this.preferenceModel.get("selected").value);
 console.log(this.preferenceModel.get("targetW").value);
 console.log(this.preferenceModel.get("targetD").value);
let pcusines=this.preferenceModel.get("selected").value;
let ptargetw=(this.preferenceModel.get("targetW").value);
let ptargetD=(this.preferenceModel.get("targetD").value);
let pcategory=this.preferenceModel.get("category").value;

console.log(pcategory);

let prefObj:prefModel ={
  category:Number(pcategory),
  targetDate:ptargetD.getTime(),
  uuuid:sessionStorage.getItem("pruuuid"),
  targetWeight:ptargetw,
  cusines:pcusines,
  startDate:new Date().getTime()
};

this.setPrefDetail(prefObj);

}
  setPrefDetail(objs:prefModel){
    var url = "http://localhost:8041/updatePref/"+objs.uuuid;
    console.log(url);
    fetch(url,{method:'POST',headers:{
      'content-type':'application/json'
    },
body:JSON.stringify({
  
	"uuuid":objs.uuuid,
  "category": objs.category,
  "targetWeight": objs.targetWeight,
  "startDate":objs.startDate,
  "targetDate":objs.targetDate,
"cusines":objs.cusines
})
  }).then(d=>{
    document.location.reload();
  })
  }

  }

  export interface prefModel{
    uuuid:String;
    category: number;
    targetWeight: number;
    startDate:number;
    targetDate:number;
    cusines:String[];
  }

