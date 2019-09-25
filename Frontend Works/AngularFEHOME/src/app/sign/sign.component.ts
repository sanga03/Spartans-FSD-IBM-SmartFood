import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit { 
  @ViewChild('openModal',undefined) openModal:ElementRef;
  status:number = 0
  loginForm = new FormGroup({
    email: new FormControl('vivek@gg.com'),
    password: new FormControl('shukla'),
  });
  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }

  ngOnInit() {
    this.openModal.nativeElement.click();
  }

  validate()
  { 
    let email= this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    fetch('http://b4ibm26.iiht.tech:1010/userLogin',{
                 method: 'POST',
                 headers:{
                     'content-type':'application/json'
                 },
                 body: JSON.stringify( {
                          "email":email,
                          "password":password   
                  })
             })
             .then(res=>res.json())
             .then(data=>{
                if(data==0)
                {
                     this.status=0; 
                     this.openModal.nativeElement.click();
                     sessionStorage.setItem("email",email);
                     this.router.navigate(['customerProfile']);

                }else if(data==1)
                {
                  this.status=1;
                }
                else
                {
                  console.log("not yet register");
                  this.status=2;
                }
             })


   
  }


}
