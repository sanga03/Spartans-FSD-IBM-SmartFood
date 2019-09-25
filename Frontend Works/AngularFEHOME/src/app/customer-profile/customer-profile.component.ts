import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
   userName:string;
   email:string;
   customerObj:any
  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }

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
          
        })
  }

  redirectToHome()
  {  sessionStorage.removeItem('email');
    this.router.navigate(['home']);
  }

}
