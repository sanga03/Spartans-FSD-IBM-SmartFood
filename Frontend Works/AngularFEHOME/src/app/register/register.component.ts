import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { registerUrl } from 'src/utils';
// import { url } from 'inspector'

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

  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }

  ngOnInit() {  
    document.body.classList.add('reg-bg-img');
   
   this.regForm = new FormGroup({
      name: new FormControl(''),
      phone:new FormControl(''),
      email:new FormControl("",[
        Validators.required,
        Validators.email,
        
      ]),
    password: new FormControl('',[
      Validators.required,
      this.ValidatePass
    ]),
    repassword:new FormControl('',[
    Validators.required,
  this.validateRepass
  ]) });
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
  // this.optSentSuccess=true;

  fetch(registerUrl,{
                 method: 'POST',
                 headers:{
                     'content-type':'application/json'
                 },
                 body: JSON.stringify( {
                   "name":name,
                          "email":email,
                          "password":password,
                          "phone":phone
                  })
             })
             .then(res=>res.json())
             .then(data=>{
               console.log(data);
               if(data == 0){
                    this.optSentSuccess=true;
                    sessionStorage.setItem("demail",email);
                    this.router.navigate(["optVerify"])
                                  }else{
                    this.emailExists=true;
               }
             })
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
  
  return null;
}

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }


}
