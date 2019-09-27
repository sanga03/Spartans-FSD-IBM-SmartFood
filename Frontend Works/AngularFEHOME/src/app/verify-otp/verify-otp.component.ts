import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  [x: string]: any;
  otpForm:FormGroup;
  otpVarified:number=-1;
  customerObj: any;
  userName:any;
  constructor( private previousRoute: ActivatedRoute ,private router: Router) { }

  ngOnInit() {
    this.otpForm=new FormGroup({
      otp:new FormControl()
    })
  }
  
  validOtp(){
    console.log(this.otpForm.get('otp').value)
  let otp=this.otpForm.get('otp').value;
  let urlOtp='http://b4ibm26.iiht.tech:1020/userOtp?otpU='+otp;
  console.log(urlOtp); 
  fetch(urlOtp)
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    if(data == true){
      this.otpVarified=0;
let email = sessionStorage.getItem("demail");
      var url = "http://b4ibm02.iiht.tech:8762/account/findEmail?email="+email;
      console.log(url);
      fetch(url).then(res=>res.json())
        .then(data=>
          {  
            this.customerObj=data;
            console.log(this.customerObj.uid)
            this.setPhysicalDetail(this.customerObj.uid)
            this.userName=data.name;
            
          })


this.router.navigate(["login"])


    }else{
      this.otpVarified=1;
      this.router.navigate(["register"])
    }
  })
  }


  setPhysicalDetail(uid)
  {   var url = "http://b4ibm29.iiht.tech:1234/physicalDetails/"+uid;
     console.log(url);
    let date = new Date().getTime();
      fetch(
        url,
        {
          method: 'POST',
          headers:{
              'content-type':'application/json'
          },
          body: JSON.stringify( {
            "height":150,
            "weight":0,
           "dob":date,
           "caloriesBurn": 0,
           "gender": 0
          
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
      })
  }
}
