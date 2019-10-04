import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { otpVerifyUrl, findEmailUrl, pushPrefUrl, fetchUrls, externalphysicalDetail } from 'src/utils';

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
  let urlOtp=otpVerifyUrl+otp;
  console.log(urlOtp); 
  fetch(urlOtp)
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    if(data == true){
      this.otpVarified=0;
let email = sessionStorage.getItem("demail");
      var url = findEmailUrl+email;
      console.log(url);
      fetch(url).then(res=>res.json())
        .then(data=>
          {  
            this.customerObj=data;
            console.log(this.customerObj.uid)
            this.setPhysicalDetail(this.customerObj.uid)
            this.setPrefDetail(this.customerObj)
            
          })


this.router.navigate(["login"])


    }else{
      this.otpVarified=1;
      this.router.navigate(["register"])
    }
  })
  }


  setPrefDetail(objs){
    var url = pushPrefUrl;
    fetch(url,{method:'POST',headers:{
      'content-type':'application/json'
    },
body:JSON.stringify({
  
	"uuuid":objs.uid,
  "category": 0,
  "targetWeight": 1,
  "startDate":new Date().getTime(),
  "targetDate":new Date().getTime(),

"cusines": []
})
  })
  }

  setPhysicalDetail(uid)
  {  
     var url = externalphysicalDetail+uid;
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
