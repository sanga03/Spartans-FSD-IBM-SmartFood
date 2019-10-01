
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  _url : any
  error:any
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender : ['male'],
      age : ['', [Validators.required, Validators.min(18),Validators.max(55)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;


  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
console.log("fsj")
  this._url = `http://localhost:8090/pay`
  fetch(this._url,{
    method : "GET",
    headers:{
      'Content-Type': 'application/json'
    }
  })
       .then(res=>res.json())
       .then(data=>{
         console.log(data)
        document.location.href = data.message;
       })
  }


MustMatch(controlName: string, matchingControlName: string) {
return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
}
    
  } 
}
