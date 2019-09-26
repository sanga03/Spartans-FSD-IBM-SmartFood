import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  otpForm:FormGroup;
  otpVarified:number=-1;
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
this.router.navigate(["login"])
    }else{
      this.otpVarified=1;
      this.router.navigate(["register"])
    }
  })
  }

}
