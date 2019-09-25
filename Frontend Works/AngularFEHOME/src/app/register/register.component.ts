import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm:FormGroup;
errMsg:String;
emailExists:boolean=false;
optSentSuccess:boolean=false;
  constructor() { }

  ngOnInit() {
   this.regForm = new FormGroup({
      name: new FormControl('name'),
      phone:new FormControl('phone'),
      email:new FormControl("email",[
        Validators.required,
        Validators.email,
        
      ]),
    password: new FormControl('password',[
      Validators.required,
      this.ValidatePass
    ]),
  repassword:new FormControl('repassword',[
    Validators.required,
  this.validateRepass
  ])  ,
  otp:new FormControl('otp'),
      

});
  }
  validate(){
    console.log("hey");
if(this.regForm.get('password').value!=this.regForm.get('repassword').value){
this.errMsg="Not Same Password";
}else{

  
  let name=this.regForm.get('name').value;
  let email=this.regForm.get('email').value;
  let phone:String=this.regForm.get('phone').value;
  let password=this.regForm.get('password').value;
  this.optSentSuccess=true;

//   fetch('http://b4ibm26.iiht.tech:1020/registerUser',{
//                  method: 'POST',
//                  headers:{
//                      'content-type':'application/json'
//                  },
//                  body: JSON.stringify( {
//                    "name":name,
//                           "email":email,
//                           "password":password   ,
//                           "phone":phone
//                   })
//              })
//              .then(res=>res.json())
//              .then(data=>{
//                console.log(data);
//                if(data == 0){
// this.optSentSuccess=true;
//                }else{
// this.emailExists=true;
//                }
//              })
}


  }
   ValidateUrl(control: AbstractControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
      return { validUrl: true };
    }
    return null;
  }
  ValidatePass(control: AbstractControl) {
    var passre = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!passre.test(control.value)) {
      return { validPass: true };
    }
    return null;
  }

validateRepass(control: AbstractControl) {
  // if (!control.value==this.regForm.get('password').value) {
  //   return { validRepass: true };
//  }
  return null;
}

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }


}
