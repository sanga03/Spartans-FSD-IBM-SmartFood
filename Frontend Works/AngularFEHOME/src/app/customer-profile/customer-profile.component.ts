import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper'
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { fetchUrls } from 'src/utils';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
 // @ViewChild(SelectAutocompleteComponent) multiselect:SelectAutocompleteComponent;
  
  
  //  myControl = new FormControl();
  constructor(private previousRoute: ActivatedRoute ,private router: Router,private _formBuilder: FormBuilder) { }
  userName:string;
  email:string;
  customerObj:any
  customerPhysicalDetail:physicalModel = {
    height:0,
    weight:0,
    dob:new Date(),
    gender:"male",
    caloriesBurn:134,
    upuuid:"0" 
  }
  physicalDetailForm =  new FormGroup({
   height: new FormControl(Number(sessionStorage.getItem("height"))),
   weight: new FormControl(Number(sessionStorage.getItem("weight")) ),
   gender: new FormControl(sessionStorage.getItem("gender")),
   dob: new FormControl(new Date(sessionStorage.getItem("dob"))) })
  
  isLinear = false;
  mealTimeFormGroup: FormGroup;
  caloriesFormGroup: FormGroup;
  mealTime = ["Breakfast","Lunch","Dinner"];
  calories = ["Light","Medium","Heavy"];
  
 ngOnInit() { 
   document.body.classList.add('bg-img');
   this.mealTimeFormGroup = this._formBuilder.group({
    mealTime: ['', Validators.required]
    });
  this.caloriesFormGroup = this._formBuilder.group({
    calories: ['', Validators.required]
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
           this.customerPhysicalDetail.dob=data.dob
           this.customerPhysicalDetail.gender=data.gender
           this.customerPhysicalDetail.upuuid=data.upuuid;
           sessionStorage.setItem("height",String(this.customerPhysicalDetail.height));
           sessionStorage.setItem("upuuid",this.customerPhysicalDetail.upuuid);
           sessionStorage.setItem("weight",String(this.customerPhysicalDetail.weight));
           sessionStorage.setItem("gender",this.customerPhysicalDetail.gender);
           sessionStorage.setItem("dob",String(this.customerPhysicalDetail.dob));
           console.log(data);
           this.physicalDetailForm =  new FormGroup({
             height: new FormControl(this.customerPhysicalDetail.height),
             weight: new FormControl( this.customerPhysicalDetail.weight),
             gender: new FormControl( this.customerPhysicalDetail.gender),
             dob: new FormControl(this.customerPhysicalDetail.dob) })
           
         })
       }
           )

          }
saveCustomerTrack() 
{  
   var meal = (<HTMLInputElement>document.getElementById("inputMeal")).value;
  //  var calories = (<HTMLInputElement>document.getElementById("inputCalories")).value
   console.log(fetchUrls.customerTrack+"/"+this.customerObj.uid)
  //  fetch(fetchUrls.customerTrack+"/"+this.customerObj.uid)
   
}
redirectToHome()   
 { 
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('cart');
    this.router.navigate(['home']);
 }

 directToCart(){
  this.router.navigate(['cart']);
 }

 setPhysicalDetail()
 {   var d:Date = this.physicalDetailForm.get('dob').value;
 let upuuid=sessionStorage.getItem("upuuid");
    console.log(upuuid);
     var url = "http://b4ibm29.iiht.tech:1234/physicalDetails/"+upuuid;
     console.log(this.physicalDetailForm.get('weight').value);
     console.log(url);
     
     console.log(d.getMilliseconds());
     fetch(
       url,
       {
         method: 'PUT',
         headers:{
             'content-type':'application/json'
         },
         body: JSON.stringify( {
           "height": this.physicalDetailForm.get('height').value,
           "weight": this.physicalDetailForm.get('weight').value,
          "dob": d.getMilliseconds() ,
          "caloriesBurn": 13,
          "gender":  this.physicalDetailForm.get('gender').value
   
         })
     }).then(res=>res.json())
     .then(data=>{
       this.customerPhysicalDetail.height = data.height;
           this.customerPhysicalDetail.weight=data.weight;
           this.customerPhysicalDetail.caloriesBurn=data.caloriesBurn;
           this.customerPhysicalDetail.dob=data.dob
           this.customerPhysicalDetail.gender=data.gender
       console.log(data);
     })
 }

}

export interface physicalModel 
{
 height:number;
 weight:number;
 dob:Date;
 gender:string
 caloriesBurn:number;
 upuuid:string;
}

