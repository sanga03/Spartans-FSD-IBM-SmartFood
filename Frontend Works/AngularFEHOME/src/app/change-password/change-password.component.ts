import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { changePass, changePassVerifyOtp } from 'src/utils';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
    @ViewChild('closeModal',undefined) closeModal:ElementRef;
    regForm:FormGroup;

    errMsg:String;
  
    constructor(private router:Router) { }
emailz:any="sangu4403@gmail.com"
otpz:String
verifyOtpCheck:number=3
checkOtp=2
  ngOnInit() {

    let el: HTMLElement = this.openModal.nativeElement;
    el.click();

    this.regForm = new FormGroup({
      otp: new FormControl(''),
    password: new FormControl('',[
      Validators.required,
      this.ValidatePass
    ]),
    repassword:new FormControl('')
   });
  }
sendOtp(){
  console.log(changePass+"email="+this.emailz);
 fetch(changePass+"email="+this.emailz).then(res=>res.json()).then(data=>{
      console.log(data);
      this.checkOtp=data;
 })
}
ValidatePass(control: AbstractControl) {
  var passre = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (!passre.test(control.value)) {
    return { validPass: true };
  }
  return null;
}

validate(){
  
  let password=this.regForm.get('password').value;
let otp=this.regForm.get('otp').value;
let repassword=this.regForm.get('repassword').value;
if(password!=repassword){
  this.errMsg="Not Same Password"
}
else{
  this.errMsg=""
  console.log(password)
console.log(otp);
fetch(changePassVerifyOtp+"otp="+otp+"&password="+password).then(res=>res.json()).then(data=>{
  console.log(data);
if(data==0){
  this.verifyOtpCheck=0;
  alert('password reset successfull')
this.router.navigate(['login'])
}else {
  this.verifyOtpCheck=data;
}
})
  
}
}
}
