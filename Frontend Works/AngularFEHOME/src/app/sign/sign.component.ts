import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { url } from 'inspector';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('vivek@gg.com'),
    password: new FormControl('shukla'),
  });

  ngOnInit() {
  
  }

  validate()
  {
    let email= this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    

   
  }


}
