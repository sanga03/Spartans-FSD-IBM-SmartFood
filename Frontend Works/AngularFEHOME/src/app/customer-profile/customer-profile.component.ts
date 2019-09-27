import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
 // @ViewChild(SelectAutocompleteComponent) multiselect:SelectAutocompleteComponent;
  
  options = [
    {
      display: 'One',
      value: '1'
    }, {
      display: 'Two',
      value: '2'
    }, {
      display: 'Three',
      value: '3'
    }, {
      display: 'Four',
      value: '4'
    }, {
      display: 'Five',
      value: '5'
    }, {
      display: 'Six',
      value: '6'
    }
  ];
   
  
  //  myControl = new FormControl();
  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }
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
   weight: new FormControl( ),
   gender: new FormControl( ),
   dob: new FormControl() })
 
   preferenceModel=new FormGroup({
    selected: new FormControl(['1', '2', '3']),
    targetW:new FormControl(),
    category:new FormControl()

   })
 ngOnInit() { 
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
 onToggleDropdown() {
  this.multiselect.toggleDropdown();
}
 redirectToHome()
 {  sessionStorage.removeItem('email');
   this.router.navigate(['home']);
 }

 setPhysicalDetail()
 {   var d:Date = this.physicalDetailForm.get('dob').value;
 let upuuid=sessionStorage.getItem("upuuid");
    console.log(upuuid);
     var url = "http://b4ibm29.iiht.tech:1234/physicalDetails/"+upuuid;
     console.log(this.physicalDetailForm.get('weight').value);
     console.log(url);
     console.log(d.getTime);
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
          "dob": d.getTime ,
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

